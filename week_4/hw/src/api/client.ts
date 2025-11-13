import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
}

export interface SignupRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}
