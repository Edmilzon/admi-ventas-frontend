import { CartProduct } from "@/types/product";
import { formatCurrency } from "./helpers";

interface OrderDetails {
  orderId: string;
  total: number;
  products: CartProduct[];
  location: string;
  fechaEntrega: string;
  horaEntrega: string;
  userName: string;
}

export const generateWhatsAppMessage = (orderDetails: OrderDetails): string => {
  const { orderId, total, products, location, fechaEntrega, horaEntrega, userName } = orderDetails;
  
  // Formatear fecha y hora
  const fechaFormateada = new Date(fechaEntrega).toLocaleDateString('es-BO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const horaFormateada = new Date(horaEntrega).toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Generar lista de productos
  const productosList = products.map(product => 
    `• ${product.nombre} x${product.cantidad} - ${formatCurrency(product.precio * product.cantidad)}`
  ).join('\n');

  const message = `🍯 *NUEVO PEDIDO CONFIRMADO* 🍯

📋 *Detalles del Pedido*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆔 *Número de Pedido:* #${orderId}
👤 *Cliente:* ${userName}
📍 *Ubicación de Entrega:* ${location}
📅 *Fecha de Entrega:* ${fechaFormateada}
🕐 *Hora de Entrega:* ${horaFormateada}

🛒 *Productos Solicitados:*
${productosList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Total del Pedido:* ${formatCurrency(total)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *Estado:* Pedido confirmado y listo para procesar

📞 *Contacto del Cliente:* Disponible en el sistema
📱 *WhatsApp:* +591 76485910

---
*Mermeladas Artesanales*
*Sabor y calidad en cada producto* 🍯✨`;

  return message;
};

export const sendWhatsAppMessage = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/59176485910?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const generateOrderConfirmationMessage = (orderDetails: OrderDetails): string => {
  const { orderId, total, products, location, fechaEntrega, horaEntrega } = orderDetails;
  
  const fechaFormateada = new Date(fechaEntrega).toLocaleDateString('es-BO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const horaFormateada = new Date(horaEntrega).toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const productosList = products.map(product => 
    `• ${product.nombre} x${product.cantidad}`
  ).join('\n');

  const message = `🍯 *¡PEDIDO CONFIRMADO!* 🍯

¡Hola! Tu pedido ha sido confirmado exitosamente.

📋 *Resumen del Pedido:*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆔 *Número de Pedido:* #${orderId}
📍 *Ubicación:* ${location}
📅 *Fecha de Entrega:* ${fechaFormateada}
🕐 *Hora de Entrega:* ${horaFormateada}

🛒 *Productos:*
${productosList}

💰 *Total:* ${formatCurrency(total)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *Estado:* En preparación
⏱️ *Tiempo estimado:* 24-48 horas

📱 *Seguimiento:* Puedes consultar el estado de tu pedido en la sección "Seguimiento" de nuestra aplicación.

📞 *Soporte:* +591 76485910

¡Gracias por elegir Mermeladas Artesanales! 🍯✨

---
*Mermeladas Artesanales*
*Sabor y calidad en cada producto*`;

  return message;
}; 