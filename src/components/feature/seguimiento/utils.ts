import { Pedido } from "@/types/pedido";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDeliveryDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-BO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getPedidosByEstado = (pedidos: Pedido[], estado: string) => {
  return pedidos.filter(p => p.estado === estado);
}; 