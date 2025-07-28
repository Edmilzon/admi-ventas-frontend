import { FaMapMarkerAlt } from "react-icons/fa";
import { DELIVERY_LOCATIONS } from "@/config/locations";
import { openGoogleMaps } from "@/lib/utils/maps";

interface LocationsSectionProps {
  onVerTodosLosPuntos: () => void;
}

export default function LocationsSection({ onVerTodosLosPuntos }: LocationsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">📍 Puntos de Entrega</h2>
        <button
          onClick={onVerTodosLosPuntos}
          className="px-3 md:px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 text-sm md:text-base"
        >
          <FaMapMarkerAlt />
          Ver Mapa Completo
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {DELIVERY_LOCATIONS.filter(loc => loc.id !== 'whatsapp').map((location) => (
          <div key={location.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-amber-800 text-sm md:text-base truncate">{location.name}</h3>
                <p className="text-xs md:text-sm text-amber-700 truncate">{location.address}</p>
              </div>
              <button
                onClick={() => openGoogleMaps(location)}
                className="p-1.5 md:p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex-shrink-0 ml-2"
                title="Ver en Google Maps"
              >
                <FaMapMarkerAlt size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 