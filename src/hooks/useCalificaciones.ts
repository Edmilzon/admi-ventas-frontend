import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { calificacionesService } from '@/lib/api/services/calificaciones';
import { CalificacionFormData } from '@/types/calificacion';

export function useCalificaciones() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const crearCalificacion = async (productoId: number, data: CalificacionFormData) => {
    if (!user?.id) {
      throw new Error('Usuario no autenticado');
    }

    try {
      setLoading(true);
      setError('');
      
      // Crear nueva calificación directamente
      const resultado = await calificacionesService.crearCalificacion(productoId, user.id, data);
      return resultado;
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al crear calificación';
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarCalificacion = async (productoId: number, data: CalificacionFormData) => {
    if (!user?.id) {
      throw new Error('Usuario no autenticado');
    }

    try {
      setLoading(true);
      setError('');
      const resultado = await calificacionesService.actualizarCalificacion(productoId, user.id, data);
      return resultado;
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al actualizar calificación';
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarCalificacion = async (productoId: number) => {
    if (!user?.id) {
      throw new Error('Usuario no autenticado');
    }

    try {
      setLoading(true);
      setError('');
      await calificacionesService.eliminarCalificacion(productoId, user.id);
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : 'Error al eliminar calificación';
      setError(mensaje);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    crearCalificacion,
    actualizarCalificacion,
    eliminarCalificacion
  };
} 