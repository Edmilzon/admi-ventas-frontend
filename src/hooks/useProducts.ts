"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { LoadingState } from "@/types/common";
import { mockProducts } from "@/lib/utils/mockData";

export const useProducts = (): LoadingState & { products: Product[] } => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));
        setProducts(mockProducts);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudo cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};
