import os
from dataclasses import dataclass
from datetime import timedelta
from dotenv import load_dotenv


load_dotenv()


@dataclass
class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///face_database.db")
    FLASK_DEBUG: str = os.getenv("FLASK_DEBUG", "1")
    FACE_SIMILARITY_THRESHOLD: float = float(os.getenv("FACE_SIMILARITY_THRESHOLD", "0.75"))
    MAX_IMAGE_SIZE_MB: int = int(os.getenv("MAX_IMAGE_SIZE_MB", "8"))
    MODELS_DIR: str = os.getenv("MODELS_DIR", "models")
    SHAPE_PREDICTOR: str = os.getenv("SHAPE_PREDICTOR", "shape_predictor_68_face_landmarks.dat")
    FACE_REC_MODEL: str = os.getenv("FACE_REC_MODEL", "dlib_face_recognition_resnet_model_v1.dat")


    # JWT
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
    ACCESS_TOKEN_EXPIRES_MIN: int = int(os.getenv("ACCESS_TOKEN_EXPIRES_MIN", "1440"))

    @property
    def JWT_ACCESS_TOKEN_EXPIRES(self):
        return timedelta(minutes=self.ACCESS_TOKEN_EXPIRES_MIN)


settings = Settings()