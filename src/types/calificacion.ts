export interface Calificacion {
  id?: number;
  productoId: number;
  usuarioId: number;
  calificacion: number;
  comentario: string;
  fecha?: string;
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
  };
}

export interface CalificacionPromedio {
  productoId: number;
  promedio: number;
  totalCalificaciones: number;
}

export interface CalificacionFormData {
  calificacion: number;
  comentario: string;
} 