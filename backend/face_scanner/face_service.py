import io
import os
from pathlib import Path
import numpy as np
import cv2
import dlib
from sqlalchemy.orm import Session

from face_scanner.config import settings
from face_scanner.models import User

# Resolve model paths relative to project root
BASE_DIR = Path(__file__).resolve().parents[1]
MODELS_DIR = Path(settings.MODELS_DIR)
if not MODELS_DIR.is_absolute():
    MODELS_DIR = BASE_DIR / settings.MODELS_DIR

shape_predictor_path = MODELS_DIR / settings.SHAPE_PREDICTOR
face_recognition_model_path = MODELS_DIR / settings.FACE_REC_MODEL

# Load Dlib models once per process
_detector = dlib.get_frontal_face_detector()
_sp = dlib.shape_predictor(str(shape_predictor_path))
_facerec = dlib.face_recognition_model_v1(str(face_recognition_model_path))


def _read_image_bgr(file_storage) -> np.ndarray:
    """Read a Werkzeug FileStorage into a BGR OpenCV image without touching disk."""
    data = file_storage.read()
    file_storage.stream.seek(0)  # reset stream for any future use
    if len(data) > settings.MAX_IMAGE_SIZE_MB * 1024 * 1024:
        raise ValueError("image too large")
    image = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("invalid image data")
    return image


def _compute_encoding(image_bgr: np.ndarray) -> np.ndarray:
    rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    faces = _detector(rgb)
    if not faces:
        raise ValueError("no face detected")
    shape = _sp(rgb, faces[0])
    descriptor = _facerec.compute_face_descriptor(rgb, shape)
    return np.array(descriptor, dtype=np.float64)  # 128-d vector


def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    denom = (np.linalg.norm(a) * np.linalg.norm(b))
    if denom == 0:
        return -1.0
    return float(np.dot(a, b) / denom)


class FaceService:
    def register_user(self, db: Session, name: str, file_storage) -> dict:
        image = _read_image_bgr(file_storage)
        encoding = _compute_encoding(image)
        user = User(name=name, encoding=encoding.tobytes())
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": f"User {name} registered successfully", "id": user.id}

    def recognize_user(self, db: Session, file_storage) -> dict:
        image = _read_image_bgr(file_storage)
        test_enc = _compute_encoding(image)

        # Fetch all users' encodings once
        users = db.query(User).all()
        if not users:
            return {"name": "Unknown", "similarity": None, "reason": "no users in database"}

        best_name = "Unknown"
        best_sim = -1.0
        for u in users:
            enc = np.frombuffer(u.encoding, dtype=np.float64)
            sim = _cosine_similarity(test_enc, enc)
            if sim > best_sim:
                best_sim = sim
                best_name = u.name

        if best_sim >= settings.FACE_SIMILARITY_THRESHOLD:
            return {"name": best_name, "similarity": best_sim}
        return {"name": "Unknown", "similarity": best_sim}

    def list_users(self, db: Session) -> list[dict]:
        users = db.query(User).all()
        return [{"id": u.id, "name": u.name} for u in users]