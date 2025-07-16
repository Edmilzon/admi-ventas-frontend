import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductoCarrito {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

interface CarritoState {
  productos: ProductoCarrito[];
  agregar: (producto: ProductoCarrito) => void;
  quitar: (id: number) => void;
  vaciar: () => void;
  cambiarCantidad: (id: number, cantidad: number) => void;
}

export const useCarritoStore = create<CarritoState>()(
  persist(
    (set, get) => ({
      productos: [],

      agregar: (nuevo) => {
        const productos = get().productos;
        const existente = productos.find(p => p.id === nuevo.id);

        if (existente) {
          set({
            productos: productos.map(p =>
              p.id === nuevo.id
                ? { ...p, cantidad: p.cantidad + nuevo.cantidad }
                : p
            )
          });
        } else {
          set({ productos: [...productos, nuevo] });
        }
      },

      quitar: (id) => {
        set({
          productos: get().productos.filter(p => p.id !== id)
        });
      },

      vaciar: () => {
        set({ productos: [] });
      },

      cambiarCantidad: (id, cantidad) => {
        if (cantidad < 1) return;
        set({
          productos: get().productos.map(p =>
            p.id === id ? { ...p, cantidad } : p
          )
        });
      }
    }),
    {
      name: 'carrito-storage',
    }
  )
);
