# Flujo de Seguimiento de Pedidos - Mermeladas Artesanales

## 🎯 Descripción

Nuevo flujo implementado para el seguimiento de pedidos con mapa integrado y estado en tiempo real.

## 🚀 Flujo Completo

### 1. Confirmación de Pedido
```
Usuario confirma pedido → Se abre Google Maps → Redirección a WhatsApp → Redirección automática a Seguimiento
```

### 2. Página de Seguimiento
- **Mapa de puntos de entrega** con todas las ubicaciones
- **Lista de pedidos del usuario** con estados
- **Indicador de pedidos pendientes** en el navbar
- **Botones de acción** para cada pedido

## 📱 Componentes Implementados

### 1. Página de Seguimiento (`/seguimiento`)
- **Ubicaciones**: Muestra todos los puntos de entrega con botones para abrir en Google Maps
- **Pedidos del usuario**: Lista filtrada de pedidos del usuario actual
- **Estados visuales**: Pendiente, Confirmado, Cancelado con iconos y colores
- **Acciones por pedido**: Ver mapa, consultar por WhatsApp

### 2. Indicador de Pedidos (`PedidosIndicator`)
- **Campana con contador** en el navbar
- **Actualización automática** cada 30 segundos
- **Solo muestra pedidos pendientes** del usuario actual
- **Responsive** para móvil y desktop

### 3. Navbar Actualizado
- **Nuevo enlace "Seguimiento"** en la navegación
- **Indicador de pedidos** junto al menú de usuario
- **Funcional en móvil y desktop**

## 🗺️ Funcionalidades del Mapa

### Puntos de Entrega
- **UMSS**: Universidad Mayor de San Simón
- **Plaza Sucre**: Plaza 25 de Mayo
- **Plaza Principal**: Plaza 14 de Septiembre
- **Correo**: Oficina de Correos de Bolivia
- **Terminal**: Terminal de Buses Cochabamba

### Acciones del Mapa
- **Ver ubicación específica**: Abre Google Maps con la ubicación seleccionada
- **Ver mapa completo**: Muestra todos los puntos de entrega
- **Desde pedidos**: Abre el mapa de la ubicación del pedido

## 📊 Estados de Pedidos

### Estados Visuales
- **🕐 Pendiente**: Amarillo - Pedido en espera de confirmación
- **✅ Confirmado**: Verde - Pedido confirmado por el administrador
- **❌ Cancelado**: Rojo - Pedido cancelado

### Acciones por Estado
- **Pendiente**: Ver mapa + Consultar por WhatsApp
- **Confirmado**: Solo ver mapa
- **Cancelado**: Solo ver mapa

## 🔄 Flujo de Usuario

### 1. Confirmar Pedido
```
1. Usuario selecciona productos
2. Elige ubicación de entrega
3. Confirma pedido
4. Se abre Google Maps (si no es WhatsApp)
5. Se abre WhatsApp con detalles
6. Redirección automática a /seguimiento
```

### 2. Seguimiento Continuo
```
1. Usuario ve sus pedidos en /seguimiento
2. Puede ver estado de cada pedido
3. Puede abrir mapa de ubicación
4. Puede consultar por WhatsApp si está pendiente
5. Indicador en navbar muestra pedidos pendientes
```

## 🎨 Características de UX

### Diseño Responsive
- **Desktop**: Layout completo con sidebar y contenido principal
- **Móvil**: Layout adaptado con menú hamburguesa
- **Tablet**: Layout intermedio optimizado

### Indicadores Visuales
- **Campana con contador** para pedidos pendientes
- **Estados con colores** para fácil identificación
- **Iconos descriptivos** para cada acción
- **Animaciones suaves** para transiciones

### Accesibilidad
- **Navegación por teclado** implementada
- **Aria-labels** para lectores de pantalla
- **Contraste adecuado** en todos los elementos
- **Tamaños de texto** legibles

## 🔧 Configuración Técnica

### Rutas
- **`/seguimiento`**: Página principal de seguimiento
- **Integrado en navbar**: Enlace permanente en navegación
- **Redirección automática**: Después de confirmar pedido

### APIs Utilizadas
- **`getPedidos()`**: Obtiene todos los pedidos
- **Filtrado por usuario**: Solo muestra pedidos del usuario actual
- **Actualización automática**: Cada 30 segundos

### Estado Global
- **AuthStore**: Para verificar autenticación
- **Filtrado dinámico**: Por ID de usuario
- **Persistencia**: Estado mantenido entre navegaciones

## 📋 Próximas Mejoras

- [ ] **Notificaciones push** para cambios de estado
- [ ] **Mapa embebido** con Google Maps API
- [ ] **Historial completo** de pedidos
- [ ] **Filtros avanzados** por fecha, estado, etc.
- [ ] **Exportar pedidos** a PDF
- [ ] **Chat integrado** para consultas
- [ ] **Tracking en tiempo real** del estado del pedido

## 🚀 Beneficios del Nuevo Flujo

1. **Transparencia**: Usuario ve estado de sus pedidos en tiempo real
2. **Facilidad**: Acceso directo a mapa y ubicaciones
3. **Comunicación**: Integración directa con WhatsApp
4. **Seguimiento**: Indicadores visuales claros
5. **UX mejorada**: Flujo intuitivo y responsive 