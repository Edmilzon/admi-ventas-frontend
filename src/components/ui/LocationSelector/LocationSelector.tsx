"use client";
import { useState } from 'react';
import { DELIVERY_LOCATIONS, getLocationById } from '@/config/locations';
import { Location } from '@/types/location';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';

interface LocationSelectorProps {
  value: string;
  onChange: (locationId: string) => void;
  disabled?: boolean;
  showMapButton?: boolean;
}

export default function LocationSelector({ 
  value, 
  onChange, 
  disabled = false,
  showMapButton = true 
}: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(
    value ? getLocationById(value) : undefined
  );

  const handleLocationChange = (locationId: string) => {
    onChange(locationId);
    setSelectedLocation(getLocationById(locationId));
  };

  const handleOpenMap = () => {
    if (selectedLocation && selectedLocation.id !== 'whatsapp') {
      const url = `https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}`;
      window.open(url, '_blank');
    }
  };

  const handleOpenDirections = () => {
    if (selectedLocation && selectedLocation.id !== 'whatsapp') {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
          value={value}
          onChange={(e) => handleLocationChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Selecciona una ubicación...</option>
          {DELIVERY_LOCATIONS.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLocation && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-amber-800 mb-1">
                {selectedLocation.name}
              </h4>
              <p className="text-sm text-amber-700 mb-1">
                {selectedLocation.address}
              </p>
              {selectedLocation.description && (
                <p className="text-xs text-amber-600 italic">
                  {selectedLocation.description}
                </p>
              )}
            </div>
            
            {showMapButton && selectedLocation.id !== 'whatsapp' && (
              <div className="flex gap-2 ml-4">
                <button
                  type="button"
                  onClick={handleOpenMap}
                  className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  title="Ver en Google Maps"
                >
                  <FaMapMarkerAlt size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleOpenDirections}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Obtener direcciones"
                >
                  <FaDirections size={16} />
                </button>
              </div>
            )}
          </div>
          
          {selectedLocation.id === 'whatsapp' && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">
                📱 Se coordinará la ubicación exacta por WhatsApp después de confirmar el pedido.
              </p>
              <p className="text-xs text-blue-600">
                💡 Al hacer clic en los botones de mapa, se mostrarán todos nuestros puntos de entrega disponibles.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 