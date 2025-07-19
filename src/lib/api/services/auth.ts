import apiClient from '../client';
import { RegisterPayload, LoginPayload, LoginResponse, User } from '@/types/auth';
import { User as UserModel } from '@/models';

export const registerUser = async (data: RegisterPayload): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/usuarios/registro', data);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/usuarios/login', data);
  
  // Guardar token en localStorage
  if (response.data.token) {
    localStorage.setItem('auth-token', response.data.token);
  }
  
  return response.data;
};

export const logoutUser = (): void => {
  localStorage.removeItem('auth-token');
};

export const getCurrentUser = async (): Promise<UserModel | null> => {
  try {
    const response = await apiClient.get<User>('/usuarios/me');
    return UserModel.fromApi(response.data);
  } catch {
    return null;
  }
}; 