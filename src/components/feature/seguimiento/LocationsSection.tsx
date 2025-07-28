import { FaMapMarkerAlt } from "react-icons/fa";
import { DELIVERY_LOCATIONS } from "@/config/locations";
import { openGoogleMaps } from "@/lib/utils/maps";

interface LocationsSectionProps {
  onVerTodosLosPuntos: () => void;
}

export default function LocationsSection({ onVerTodosLosPuntos }: LocationsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📍 Puntos de Entrega</h2>
        <button
          onClick={onVerTodosLosPuntos}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <FaMapMarkerAlt />
          Ver Mapa Completo
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DELIVERY_LOCATIONS.filter(loc => loc.id !== 'whatsapp').map((location) => (
          <div key={location.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-amber-800">{location.name}</h3>
                <p className="text-sm text-amber-700">{location.address}</p>
              </div>
              <button
                onClick={() => openGoogleMaps(location)}
                className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                title="Ver en Google Maps"
              >
                <FaMapMarkerAlt size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 