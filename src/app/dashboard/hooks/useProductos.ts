"use client";
import { useEffect, useState } from "react";
import { Producto } from "../interface/productos";
import { obtenerProductos } from "../service/serviceProductos";

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudo cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { productos, loading, error };
};
