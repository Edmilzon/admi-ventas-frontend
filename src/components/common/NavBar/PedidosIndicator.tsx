"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getPedidos } from '@/lib/api/services/pedidos';
import { FaBell } from 'react-icons/fa';

interface Pedido {
  id: number;
  usuario: {
    id: number;
  };
  estado: string;
}

export default function PedidosIndicator() {
  const { user, isAuthenticated } = useAuthStore();
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchPedidosPendientes = async () => {
      setLoading(true);
      try {
        const data = await getPedidos();
        const userPedidos = data.filter((pedido: Pedido) => 
          pedido.usuario?.id === user?.id && pedido.estado === 'pendiente'
        );
        setPedidosPendientes(userPedidos.length);
      } catch (err) {
        console.error('Error al cargar pedidos pendientes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosPendientes();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchPedidosPendientes, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user]);

  if (!isAuthenticated || loading) return null;

  return (
    <div className="relative">
      <FaBell className="text-2xl text-amber-700" />
      {pedidosPendientes > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {pedidosPendientes}
        </span>
      )}
    </div>
  );
} 