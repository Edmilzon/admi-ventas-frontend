# Sistema de Mensajes de WhatsApp

## Descripción
Este sistema permite enviar mensajes automáticos de WhatsApp cuando se confirma un pedido, proporcionando información estructurada y profesional sobre el pedido.

## Archivos Involucrados

### `src/lib/utils/whatsapp.ts`
Contiene las funciones principales para generar y enviar mensajes de WhatsApp:

- **`generateWhatsAppMessage(orderDetails)`**: Genera un mensaje profesional para el administrador
- **`sendWhatsAppMessage(message)`**: Abre WhatsApp Web con el mensaje pre-llenado
- **`generateOrderConfirmationMessage(orderDetails)`**: Genera un mensaje de confirmación para el cliente

### `src/app/detallerpedido/page.tsx`
Integra el sistema de mensajes en el flujo de confirmación de pedidos.

## Funcionalidades

### 1. Mensaje para Administrador
Cuando se confirma un pedido, se envía automáticamente un mensaje al WhatsApp del administrador con:

- 🍯 Emojis y formato profesional
- 📋 Detalles completos del pedido
- 🆔 Número de pedido
- 👤 Información del cliente
- 📍 Ubicación de entrega
- 📅 Fecha y hora de entrega
- 🛒 Lista de productos con cantidades y precios
- 💰 Total del pedido
- ✅ Estado del pedido
- 📞 Información de contacto

### 2. Formato del Mensaje
```
🍯 NUEVO PEDIDO CONFIRMADO 🍯

📋 Detalles del Pedido
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆔 Número de Pedido: #123
👤 Cliente: Juan Pérez
📍 Ubicación de Entrega: UMSS
📅 Fecha de Entrega: lunes, 15 de enero de 2024
🕐 Hora de Entrega: 14:30

🛒 Productos Solicitados:
• Mermelada de Tomate x2 - S/ 20.00
• Mermelada de Uchuba x1 - S/ 15.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Total del Pedido: S/ 35.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Estado: Pedido confirmado y listo para procesar

📞 Contacto del Cliente: Disponible en el sistema
📱 WhatsApp: +591 76485910

---
Mermeladas Artesanales
Sabor y calidad en cada producto 🍯✨
```

## Integración

### Flujo de Confirmación de Pedido
1. Usuario completa el formulario de pedido
2. Se envía la petición al backend
3. Si la petición es exitosa:
   - Se genera el mensaje de WhatsApp
   - Se abre WhatsApp Web con el mensaje pre-llenado
   - Se limpia el carrito
   - Se redirige a la página de seguimiento

### Datos Incluidos en el Mensaje
- **ID del Pedido**: Generado por el backend
- **Total**: Calculado del carrito
- **Productos**: Lista con nombres, cantidades y precios
- **Ubicación**: Dirección seleccionada por el usuario
- **Fecha y Hora**: Programadas para la entrega
- **Usuario**: Nombre o correo del cliente

## Personalización

### Modificar el Número de WhatsApp
Cambiar en `src/lib/utils/whatsapp.ts`:
```typescript
const whatsappUrl = `https://wa.me/59176485910?text=${encodedMessage}`;
```

### Modificar el Formato del Mensaje
Editar las funciones `generateWhatsAppMessage()` y `generateOrderConfirmationMessage()` en `src/lib/utils/whatsapp.ts`.

### Agregar Campos Adicionales
Modificar la interfaz `OrderDetails` y actualizar las funciones de generación de mensajes.

## Ventajas

1. **Automatización**: No requiere intervención manual
2. **Profesionalismo**: Formato estructurado y atractivo
3. **Completitud**: Incluye toda la información relevante
4. **Inmediatez**: Se envía al momento de confirmar el pedido
5. **Trazabilidad**: Facilita el seguimiento de pedidos

## Notas Técnicas

- Los mensajes se codifican con `encodeURIComponent()` para caracteres especiales
- Se usa `window.open()` para abrir WhatsApp Web
- El formato incluye emojis y separadores visuales
- Los precios se formatean con la función `formatCurrency()`
- Las fechas se formatean en español boliviano 