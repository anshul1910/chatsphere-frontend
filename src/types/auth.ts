export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: true;
  token: string;
  user: User;
}

export interface MeResponse {
  success: true;
  user: User;
}
