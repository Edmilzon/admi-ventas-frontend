import apiClient from '../client';
import { Calificacion, CalificacionFormData, CalificacionPromedio } from '@/types/calificacion';

const BASE_URL = 'https://admi-ventas-backend.onrender.com/calificaciones';

export const calificacionesService = {
  // Crear calificación
  async crearCalificacion(productoId: number, usuarioId: number, data: CalificacionFormData): Promise<Calificacion> {
    try {
      const response = await apiClient.post<Calificacion>(`${BASE_URL}/${productoId}?usuarioId=${usuarioId}`, data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message: string } }; message: string };
      throw new Error(`Error al crear calificación: ${axiosError.response?.data?.message || axiosError.message}`);
    }
  },

  // Obtener calificaciones de un producto
  async getCalificacionesProducto(productoId: number): Promise<Calificacion[]> {
    try {
      const response = await apiClient.get<Calificacion[]>(`${BASE_URL}/producto/${productoId}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error al obtener calificaciones del producto:', error);
      return [];
    }
  },

  // Obtener calificaciones de un usuario
  async getCalificacionesUsuario(usuarioId: number): Promise<Calificacion[]> {
    try {
      const response = await apiClient.get<Calificacion[]>(`${BASE_URL}/usuario/${usuarioId}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error al obtener calificaciones del usuario:', error);
      return [];
    }
  },

  // Obtener promedio de calificaciones de un producto
  async getPromedioCalificaciones(productoId: number): Promise<CalificacionPromedio> {
    try {
      const response = await apiClient.get<CalificacionPromedio>(`${BASE_URL}/producto/${productoId}/promedio`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error al obtener promedio de calificaciones:', error);
      return {
        productoId,
        promedio: 0,
        totalCalificaciones: 0
      };
    }
  },

  // Actualizar calificación
  async actualizarCalificacion(productoId: number, usuarioId: number, data: CalificacionFormData): Promise<Calificacion> {
    try {
      const response = await apiClient.put<Calificacion>(`${BASE_URL}/${productoId}?usuarioId=${usuarioId}`, data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message: string } }; message: string };
      throw new Error(`Error al actualizar calificación: ${axiosError.response?.data?.message || axiosError.message}`);
    }
  },

  // Eliminar calificación
  async eliminarCalificacion(productoId: number, usuarioId: number): Promise<void> {
    try {
      await apiClient.delete(`${BASE_URL}/${productoId}?usuarioId=${usuarioId}`);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message: string } }; message: string };
      throw new Error(`Error al eliminar calificación: ${axiosError.response?.data?.message || axiosError.message}`);
    }
  }
}; 