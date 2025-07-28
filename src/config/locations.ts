import { Location } from '@/types/location';

export const DELIVERY_LOCATIONS: Location[] = [
  {
    id: 'umss',
    name: 'UMSS',
    address: 'Universidad Mayor de San Simón',
    latitude: -17.394442473681746,
    longitude: -66.14783648274414,
    description: 'Campus universitario principal'
  },
  {
    id: 'plaza-sucre',
    name: 'Plaza Sucre',
    address: 'Plaza 25 de Mayo (Plaza Sucre)',
    latitude: -17.39218469424282,
    longitude: -66.14800175218255,
    description: 'Plaza central histórica'
  },
  {
    id: 'plaza-principal',
    name: 'Plaza Principal',
    address: 'Plaza 14 de Septiembre',
    latitude: -17.393662214823507,
    longitude: -66.15698719090788,
    description: 'Plaza principal de Cochabamba'
  },
  {
    id: 'correo',
    name: 'Correo',
    address: 'Oficina de Correos de Bolivia',
    latitude: -17.39269933758967,
    longitude: -66.15864858371927,
    description: 'Oficina postal central'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    address: 'Terminal de Buses Cochabamba',
    latitude: -17.402419184605037,
    longitude: -66.15765696712488,
    description: 'Terminal de transporte público'
  },
  {
    id: 'whatsapp',
    name: 'Coordinar por WhatsApp',
    address: 'Punto de Encuentro - Centro de Cochabamba',
    latitude: -17.393662214823507,
    longitude: -66.15698719090788,
    description: 'Punto de encuentro fijo - se coordinará la ubicación específica por WhatsApp'
  }
];

export const getLocationById = (id: string): Location | undefined => {
  return DELIVERY_LOCATIONS.find(location => location.id === id);
};

export const getLocationByName = (name: string): Location | undefined => {
  return DELIVERY_LOCATIONS.find(location => location.name.toLowerCase() === name.toLowerCase());
}; 