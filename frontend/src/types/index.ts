export interface User {
  name: string;
  email: string;
  phone?: string;
}

export interface Face {
  name: string;
  created_at: string;
}

export interface FacesResponse {
  faces: Face[];
}

export interface LoginResponse {
  access_token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterFaceRequest {
  name: string;
  face_data: string;
}

export interface RecogniseRequest {
  face_data: string;
}

export interface RecogniseResponse {
  name: string;
  face_match_ratio: number;
}

export interface ApiError {
  msg: string;
}