"use client";
import { Location } from '@/types/location';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { openAllLocationsMap } from '@/lib/utils/maps';

interface MapPreviewProps {
  location: Location;
  className?: string;
}

export default function MapPreview({ location, className = "" }: MapPreviewProps) {
  if (location.id === 'whatsapp') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span className="text-blue-700 font-medium">
            Ubicación a coordinar por WhatsApp
          </span>
        </div>
        <p className="text-sm text-blue-600 mb-3">
          Se coordinará la ubicación exacta por WhatsApp después de confirmar el pedido.
        </p>
        <button
          onClick={() => {
            openAllLocationsMap();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Ver todos los puntos de entrega
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <FaMapMarkerAlt className="text-amber-600" />
        <span className="font-medium text-gray-700">{location.name}</span>
      </div>
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          📍 {location.address}
        </p>
        <p className="text-xs text-gray-500">
          Coordenadas: {location.latitude}, {location.longitude}
        </p>
        <div className="mt-3">
          <button
            onClick={() => {
              const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
              window.open(url, '_blank');
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Ver en Google Maps
          </button>
        </div>
      </div>
    </div>
  );
} 