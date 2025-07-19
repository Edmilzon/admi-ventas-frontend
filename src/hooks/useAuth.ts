"use client";
import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { loginUser, registerUser, logoutUser } from "@/lib/api/services/auth";
import { LoginPayload, RegisterPayload } from "@/types/auth";

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
}

export const useAuth = () => {
  const { isAuthenticated, user, token, login, logout: logoutStore } = useAuthStore();

  const loginHandler = useCallback(async (credentials: LoginPayload) => {
    try {
      const response = await loginUser(credentials);
      if (response.user) {
        // Asumiendo que el backend devuelve un usuario completo
        const fullUser = {
          id: response.user.id,
          nombre: response.user.nombre,
          correo: response.user.correo,
          direccion: '', // Estos campos se pueden obtener con getCurrentUser si es necesario
          telf: ''
        };
        login(response.token, fullUser);
      }
      return { success: true };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return { 
        success: false, 
        error: apiError.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  }, [login]);

  const registerHandler = useCallback(async (userData: RegisterPayload) => {
    try {
      await registerUser(userData);
      return { success: true };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return { 
        success: false, 
        error: apiError.response?.data?.message || 'Error al registrar usuario' 
      };
    }
  }, []);

  const logoutHandler = useCallback(() => {
    logoutUser();
    logoutStore();
  }, [logoutStore]);

  return {
    isAuthenticated,
    user,
    token,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler,
  };
}; 