import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { EstadoPedido, TabPedido } from "@/types/pedido";

export const ESTADOS: Record<string, EstadoPedido> = {
  pendiente: { 
    label: "Pendientes", 
    icon: FaClock, 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-100", 
    borderColor: "border-yellow-200" 
  },
  vendido: { 
    label: "Confirmados", 
    icon: FaCheckCircle, 
    color: "text-green-600", 
    bgColor: "bg-green-100", 
    borderColor: "border-green-200" 
  },
  cancelado: { 
    label: "Cancelados", 
    icon: FaTimesCircle, 
    color: "text-red-600", 
    bgColor: "bg-red-100", 
    borderColor: "border-red-200" 
  }
};

export const TABS: TabPedido[] = [
  { 
    key: "pendiente", 
    label: "Pendientes", 
    icon: FaClock, 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-100" 
  },
  { 
    key: "vendido", 
    label: "Confirmados", 
    icon: FaCheckCircle, 
    color: "text-green-600", 
    bgColor: "bg-green-100" 
  },
  { 
    key: "cancelado", 
    label: "Cancelados", 
    icon: FaTimesCircle, 
    color: "text-red-600", 
    bgColor: "bg-red-100" 
  }
]; 