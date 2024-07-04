// services/api.ts
import axios from 'axios';
import { z } from 'zod';

const API_URL =  process.env.NEXT_PUBLIC_API_URL;

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/register/`, { username, email, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login/`, { username, password });
  return response.data;
};
