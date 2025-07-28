import { ComponentType } from "react";

export interface Pedido {
  id: number;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
    direccion: string;
    telf: string;
  };
  direccion: string;
  total: string;
  fecha: string;
  fechaEntrega?: string; // Campo opcional de fecha de entrega
  estado: string;
  detalles: {
    id: number;
    producto: {
      id: number;
      nombre: string;
      descripcion: string;
      precio: string;
      imagen: string;
      stock: number;
    };
    cantidad: number;
    precio: string;
  }[];
}

export interface EstadoPedido {
  label: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface TabPedido {
  key: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
} 