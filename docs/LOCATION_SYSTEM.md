# Sistema de Ubicaciones - Mermeladas Artesanales

## 📍 Descripción

Este sistema permite gestionar ubicaciones de entrega con coordenadas geográficas y integración con Google Maps.

## 🏗️ Estructura

### Archivos Principales

- `src/types/location.ts` - Tipos TypeScript para ubicaciones
- `src/config/locations.ts` - Configuración de ubicaciones disponibles
- `src/lib/utils/maps.ts` - Utilidades para Google Maps
- `src/components/ui/LocationSelector/` - Componente de selección de ubicaciones
- `src/components/ui/MapPreview/` - Componente de vista previa de mapa

## 🗺️ Ubicaciones Configuradas

### Ubicaciones con Coordenadas Reales
- **UMSS** - Universidad Mayor de San Simón (-17.394442473681746, -66.14783648274414)
- **Plaza Sucre** - Plaza 25 de Mayo (-17.39218469424282, -66.14800175218255)
- **Plaza Principal** - Plaza 14 de Septiembre (-17.393662214823507, -66.15698719090788)
- **Correo** - Oficina de Correos de Bolivia (-17.39269933758967, -66.15864858371927)
- **Terminal** - Terminal de Buses Cochabamba (-17.402419184605037, -66.15765696712488)

### Ubicación Especial
- **Coordinar por WhatsApp** - Muestra todos los puntos de entrega disponibles

## 🚀 Funcionalidades

### 1. Selección de Ubicación
```tsx
import LocationSelector from '@/components/ui/LocationSelector';

<LocationSelector
  value={selectedLocationId}
  onChange={setSelectedLocationId}
  disabled={false}
  showMapButton={true}
/>
```

### 2. Abrir Google Maps
```tsx
import { openGoogleMaps, openAllLocationsMap } from '@/lib/utils/maps';

// Abrir ubicación en Google Maps
openGoogleMaps(selectedLocation);

// Abrir direcciones desde ubicación actual
openGoogleMapsDirections(selectedLocation);

// Abrir mapa con todos los puntos (para WhatsApp)
openAllLocationsMap();
```

### 3. Vista Previa de Mapa
```tsx
import MapPreview from '@/components/ui/MapPreview';

<MapPreview location={selectedLocation} />
```

## 📱 Flujo de Usuario

1. **Selección**: El usuario selecciona una ubicación del dropdown
2. **Vista Previa**: Se muestra información de la ubicación seleccionada
3. **Botones de Acción**: 
   - 📍 Ver en Google Maps
   - 🧭 Obtener direcciones
   - 🗺️ Ver todos los puntos (si selecciona WhatsApp)
4. **Confirmación**: Al confirmar el pedido, se abre automáticamente Google Maps

## 🔧 Configuración

### Agregar Nueva Ubicación

1. Editar `src/config/locations.ts`:
```tsx
{
  id: 'nueva-ubicacion',
  name: 'Nueva Ubicación',
  address: 'Dirección completa',
  latitude: -17.3895,
  longitude: -66.1568,
  description: 'Descripción opcional'
}
```

### Personalizar Coordenadas

Las coordenadas actuales son ejemplos. Para obtener coordenadas reales:

1. Ir a Google Maps
2. Buscar la ubicación
3. Click derecho → "¿Qué hay aquí?"
4. Copiar las coordenadas (lat, lng)

## 🎨 Componentes

### LocationSelector
- Dropdown con todas las ubicaciones
- Vista previa de la ubicación seleccionada
- Botones para abrir Google Maps
- Manejo especial para WhatsApp (muestra todos los puntos)

### MapPreview
- Vista previa de la ubicación
- Información de dirección
- Botón para abrir Google Maps
- Manejo especial para WhatsApp (botón para ver todos los puntos)

## 🔒 Consideraciones

- Las coordenadas actuales son ejemplos
- Para producción, usar coordenadas reales
- Considerar agregar API key de Google Maps para mapas estáticos
- Implementar geolocalización del usuario para direcciones

## 📋 Próximas Mejoras

- [ ] Geolocalización automática del usuario
- [ ] Cálculo de distancia y tiempo de entrega
- [ ] Mapa embebido con Google Maps API
- [ ] Historial de ubicaciones favoritas
- [ ] Validación de coordenadas 