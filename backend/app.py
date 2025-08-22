from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import base64

from face_scanner.config import settings

app = Flask(__name__)
app.config['SECRET_KEY'] = settings.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL
app.config['JWT_SECRET_KEY'] = settings.JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = settings.JWT_ACCESS_TOKEN_EXPIRES

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# FaceData table
class FaceData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    face_data = db.Column(db.String(256), nullable=False)  # encrypted string
    owner_email = db.Column(db.String(120), db.ForeignKey('user.email'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    password = data.get('password')
    if not all([name, email, password]):
        return jsonify({'msg': 'Missing required fields'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'Email already registered'}), 409
    user = User(
        name=name,
        phone=phone,
        email=email,
        password_hash=generate_password_hash(password)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User registered successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'msg': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token}), 200

# Logout route (client-side, just instruct to delete token)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'msg': 'Logout successful. Please delete token on client.'}), 200

# Register new face
@app.route('/register', methods=['POST'])
@jwt_required()
def register_face():
    data = request.json
    face_name = data.get('name')
    face_data = data.get('face_data')  # should be a string (simulate encryption)
    owner_email = get_jwt_identity()
    if not all([face_name, face_data]):
        return jsonify({'msg': 'Missing required fields'}), 400
    # Simulate encryption (base64)
    encrypted_face_data = base64.b64encode(face_data.encode()).decode()
    face_entry = FaceData(
        name=face_name,
        face_data=encrypted_face_data,
        owner_email=owner_email
    )
    db.session.add(face_entry)
    db.session.commit()
    return jsonify({'msg': 'Face registered successfully'}), 201

# Recognise face
@app.route('/recognise', methods=['POST'])
@jwt_required()
def recognise_face():
    data = request.json
    input_face_data = data.get('face_data')
    owner_email = get_jwt_identity()
    if not input_face_data:
        return jsonify({'msg': 'Missing face data'}), 400
    # Simulate encryption
    encrypted_input = base64.b64encode(input_face_data.encode()).decode()
    faces = FaceData.query.filter_by(owner_email=owner_email).all()
    results = []
    for face in faces:
        # Simulate face match ratio (string similarity)
        match_ratio = (
            sum(a == b for a, b in zip(face.face_data, encrypted_input)) / max(len(face.face_data), 1)
        )
        results.append({
            'name': face.name,
            'match_ratio': round(match_ratio * 100, 2)
        })
    # Return best match
    if results:
        best = max(results, key=lambda x: x['match_ratio'])
        return jsonify({'name': best['name'], 'face_match_ratio': best['match_ratio']}), 200
    return jsonify({'msg': 'No faces registered'}), 404

# List all registered faces for user
@app.route('/faces', methods=['GET'])
@jwt_required()
def list_faces():
    owner_email = get_jwt_identity()
    faces = FaceData.query.filter_by(owner_email=owner_email).all()
    face_list = [{'name': f.name, 'created_at': f.created_at.isoformat()} for f in faces]
    return jsonify({'faces': face_list}), 200

# Utility: create tables
@app.cli.command('init-db')
def init_db():
    db.create_all()
    print('Database tables created.')

if __name__ == '__main__':
    app.run(debug=bool(int(settings.FLASK_DEBUG)))
