import { Location } from '@/types/location';
import { DELIVERY_LOCATIONS } from '@/config/locations';

export const openGoogleMaps = (location: Location) => {
  if (location.id === 'whatsapp') {
    // Para WhatsApp, abrir mapa con todos los puntos
    openAllLocationsMap();
    return;
  }
  
  const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
  window.open(url, '_blank');
};

export const openGoogleMapsDirections = (location: Location) => {
  if (location.id === 'whatsapp') {
    // Para WhatsApp, abrir mapa con todos los puntos
    openAllLocationsMap();
    return;
  }
  
  const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
  window.open(url, '_blank');
};

export const openAllLocationsMap = () => {
  // Filtrar ubicaciones con coordenadas válidas
  const locationsWithCoords = DELIVERY_LOCATIONS.filter(loc => 
    loc.id !== 'whatsapp' && loc.latitude !== 0 && loc.longitude !== 0
  );
  
  if (locationsWithCoords.length === 0) return;
  
  // Crear URL con múltiples marcadores
  const markers = locationsWithCoords.map(loc => 
    `markers=color:red%7Clabel:${loc.name.charAt(0)}%7C${loc.latitude},${loc.longitude}`
  ).join('&');
  
  // Usar la primera ubicación como centro del mapa
  const center = locationsWithCoords[0];
  const url = `https://www.google.com/maps?q=${center.latitude},${center.longitude}&${markers}`;
  
  window.open(url, '_blank');
};

export const getLocationDisplayInfo = (location: Location) => {
  return {
    name: location.name,
    address: location.address,
    description: location.description,
    hasCoordinates: location.latitude !== 0 && location.longitude !== 0
  };
}; 