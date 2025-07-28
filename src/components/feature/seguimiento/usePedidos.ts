import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { getPedidos } from "@/lib/api/services/pedidos";
import { Pedido } from "@/types/pedido";

export function usePedidos() {
  const { user } = useAuthStore();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPedidos();
      // Filtrar solo los pedidos del usuario actual
      const userPedidos = data.filter((pedido: Pedido) => 
        pedido.usuario?.id === user?.id
      );
      setPedidos(userPedidos);
    } catch {
      setError("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updatePedidoEstado = async (pedidoId: number, nuevoEstado: string) => {
    try {
      const response = await fetch(`https://admi-ventas-backend.onrender.com/ventas/${pedidoId}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (response.ok) {
        // Actualizar el estado del pedido en la lista local
        setPedidos(prevPedidos => 
          prevPedidos.map(p => 
            p.id === pedidoId 
              ? { ...p, estado: nuevoEstado }
              : p
          )
        );
        return true;
      } else {
        throw new Error(`Error al actualizar el estado del pedido`);
      }
    } catch {
      setError(`Error al actualizar el pedido. Intenta de nuevo.`);
      return false;
    }
  };

  const confirmarPago = async (pedidoId: number) => {
    return await updatePedidoEstado(pedidoId, 'vendido');
  };

  const confirmarCancelacion = async (pedidoId: number) => {
    return await updatePedidoEstado(pedidoId, 'cancelado');
  };

  useEffect(() => {
    if (user?.id) {
      fetchPedidos();
    }
  }, [user?.id, fetchPedidos]);

  return {
    pedidos,
    loading,
    error,
    fetchPedidos,
    confirmarPago,
    confirmarCancelacion
  };
} 