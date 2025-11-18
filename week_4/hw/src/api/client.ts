import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    message: string;
  };
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status?: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}
