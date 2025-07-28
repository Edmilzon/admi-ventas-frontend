import { FaMapMarkerAlt, FaWhatsapp, FaCalendarAlt, FaCreditCard, FaTimes } from "react-icons/fa";
import { DELIVERY_LOCATIONS } from "@/config/locations";
import EmbeddedMap from "@/components/ui/EmbeddedMap";
import { Pedido } from "@/types/pedido";
import { ESTADOS } from "./constants";
import { formatDate, formatDeliveryDate } from "./utils";

interface PedidoCardProps {
  pedido: Pedido;
  onPagar: (pedido: Pedido) => void;
  onCancelar: (pedido: Pedido) => void;
}

export default function PedidoCard({ pedido, onPagar, onCancelar }: PedidoCardProps) {
  const estado = ESTADOS[pedido.estado as keyof typeof ESTADOS] || ESTADOS.pendiente;
  const EstadoIcon = estado.icon;
  
  // Buscar la ubicación correspondiente con mejor lógica
  let location = DELIVERY_LOCATIONS.find(loc => {
    // Si la dirección contiene "whatsapp" o "coordinar", usar la ubicación de WhatsApp
    if (pedido.direccion.toLowerCase().includes('whatsapp') || 
        pedido.direccion.toLowerCase().includes('coordinar')) {
      return loc.id === 'whatsapp';
    }
    // Buscar por nombre exacto
    return loc.name.toLowerCase() === pedido.direccion.toLowerCase();
  });

  // Si no encuentra la ubicación pero la dirección contiene "whatsapp" o "coordinar", usar la ubicación de WhatsApp
  if (!location && (pedido.direccion.toLowerCase().includes('whatsapp') || 
                    pedido.direccion.toLowerCase().includes('coordinar'))) {
    location = DELIVERY_LOCATIONS.find(loc => loc.id === 'whatsapp');
  }

  // Debug: mostrar información
  console.log('Pedido dirección:', pedido.direccion);
  console.log('Location encontrada:', location);
  
  return (
    <div className={`border ${estado.borderColor} rounded-lg p-6 hover:shadow-md transition-shadow ${estado.bgColor}`}>
      {/* Layout principal: información y mapa lado a lado */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Primera columna: Información del pedido, productos y botones */}
        <div className="lg:w-2/5">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-gray-800">Pedido #{pedido.id}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${estado.bgColor} ${estado.color} flex items-center gap-1`}>
              <EstadoIcon size={14} />
              {estado.label}
            </span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-gray-600">
                <strong>Fecha de pedido:</strong> {formatDate(pedido.fecha)}
              </p>
            </div>
            
            {pedido.fechaEntrega && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                <p className="text-amber-800 flex items-center gap-2">
                  <FaCalendarAlt className="text-amber-600" />
                  <strong>Fecha de entrega:</strong>
                </p>
                <p className="text-amber-700 font-medium mt-1">
                  {formatDeliveryDate(pedido.fechaEntrega)}
                </p>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-gray-600">
                <strong>Total:</strong> S/ {pedido.total}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="text-gray-600">
                <strong>Dirección:</strong> {pedido.direccion}
              </p>
            </div>
          </div>
          
          {/* Productos */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Productos:</h4>
            <div className="space-y-2">
              {pedido.detalles.map((detalle) => (
                <div key={detalle.id} className={`flex justify-between items-center bg-white rounded-lg p-2 border ${estado.borderColor}`}>
                  <span className="text-sm text-gray-700">{detalle.producto.nombre}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    x{detalle.cantidad} - S/ {detalle.precio}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botones de acción para pedidos pendientes */}
          {pedido.estado === 'pendiente' && (
            <div className="space-y-3">
              {/* Botón de WhatsApp */}
              <div className="flex justify-center">
                <button
                  onClick={() => window.open(`https://wa.me/59176485910?text=Hola, tengo una consulta sobre mi pedido #${pedido.id}`, '_blank')}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                  title="Consultar por WhatsApp"
                >
                  <FaWhatsapp size={16} />
                  Consultar por WhatsApp
                </button>
              </div>
              
              {/* Botones de Pagar y Cancelar */}
              <div className="flex gap-3">
                <button
                  onClick={() => onPagar(pedido)}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                  title="Pagar pedido"
                >
                  <FaCreditCard size={16} />
                  Pagar
                </button>
                <button
                  onClick={() => onCancelar(pedido)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                  title="Cancelar pedido"
                >
                  <FaTimes size={16} />
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Segunda columna: Mapa embebido solo para pedidos pendientes */}
        {pedido.estado === 'pendiente' && location && (
          <div className="lg:w-3/5">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaMapMarkerAlt className="text-amber-600" />
              Ubicación de Entrega
            </h4>
            <div className="h-100 lg:h-119 rounded-lg overflow-hidden border border-gray-200">
              <EmbeddedMap location={location} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 