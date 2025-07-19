import apiClient from '../client';
import { RegisterPayload, LoginPayload, LoginResponse, User } from '@/types/auth';
import { User as UserModel } from '@/models';

// Simular registro (no hace nada)
export const registerUser = async (data: RegisterPayload): Promise<{ message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ message: 'Registro simulado exitoso' }), 500);
  });
};

// Simular login exitoso para cualquier usuario/contraseña
export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'demo-token',
        user: {
          id: 1,
          nombre: 'Usuario Demo',
          correo: data.correo,
          direccion: 'Calle Falsa 123',
          telf: '70000000',
        } as User,
      });
    }, 500);
  });
};

export const logoutUser = (): void => {
  localStorage.removeItem('auth-token');
};

export const getCurrentUser = async (): Promise<UserModel | null> => {
  // Simular usuario actual
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        UserModel.fromApi({
          id: 1,
          nombre: 'Usuario Demo',
          correo: 'demo@mermeladas.com',
          direccion: 'Calle Falsa 123',
          telf: '70000000',
        })
      );
    }, 300);
  });
}; 