"use client";
import { useState } from 'react';
import { Location } from '@/types/location';
import { FaMapMarkerAlt, FaTimes, FaExpand, FaCompress, FaStreetView, FaMap } from 'react-icons/fa';

interface EmbeddedMapProps {
  location: Location;
  onClose?: () => void;
  className?: string;
}

export default function EmbeddedMap({ location, onClose, className = "" }: EmbeddedMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'street'>('map');

  const getMapUrl = () => {
    if (viewMode === 'street') {
      return `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&location=${location.latitude},${location.longitude}&heading=210&pitch=10&fov=90`;
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.latitude},${location.longitude}&zoom=15`;
  };

  // Si no hay onClose, es un mapa embebido en tarjeta
  if (!onClose) {
    return (
      <div className={`w-full h-full ${className}`}>
        {/* Controles de vista */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Vista de mapa"
          >
            <FaMap size={12} />
            Mapa
          </button>
          <button
            onClick={() => setViewMode('street')}
            className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
              viewMode === 'street' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Vista de calle"
          >
            <FaStreetView size={12} />
            Street View
          </button>
        </div>
        
        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${viewMode === 'street' ? 'Street View' : 'Mapa'} de ${location.name}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${isExpanded ? 'fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4' : ''} ${className}`}>
      <div className={`bg-white rounded-lg shadow-lg ${isExpanded ? 'w-full h-full max-w-6xl' : 'w-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-amber-600" />
            <div>
              <h3 className="font-semibold text-gray-800">{location.name}</h3>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title={isExpanded ? "Comprimir" : "Expandir"}
            >
              {isExpanded ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar"
              >
                <FaTimes size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Controles de vista */}
        <div className="flex gap-2 p-4 border-b border-gray-200">
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              viewMode === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Vista de mapa"
          >
            <FaMap size={14} />
            Vista de Mapa
          </button>
          <button
            onClick={() => setViewMode('street')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              viewMode === 'street' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title="Vista de calle"
          >
            <FaStreetView size={14} />
            Street View
          </button>
        </div>

        {/* Mapa */}
        <div className={`${isExpanded ? 'h-full' : 'h-64'} w-full`}>
          <iframe
            src={getMapUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${viewMode === 'street' ? 'Street View' : 'Mapa'} de ${location.name}`}
          />
        </div>

        {/* Información adicional */}
        {!isExpanded && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p><strong>Coordenadas:</strong> {location.latitude}, {location.longitude}</p>
                {location.description && (
                  <p className="mt-1 italic">{location.description}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {viewMode === 'street' 
                    ? 'Street View: Gira la vista con el mouse, usa las flechas para moverte'
                    : 'Mapa: Haz zoom y arrastra para explorar'
                  }
                </p>
              </div>
              <button
                onClick={() => window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank')}
                className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
              >
                Abrir en Google Maps
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 