export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-amber-700 mb-4">Contacto</h1>
      <p className="text-lg text-gray-700 mb-4">
        ¿Tienes dudas, sugerencias o quieres hacer un pedido especial? ¡Contáctanos!
      </p>
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <p className="mb-2"><span className="font-semibold">Email:</span> <a href="mailto:contacto@mermeladasartesanales.com" className="text-amber-700 underline">contacto@mermeladasartesanales.com</a></p>
        <p className="mb-2"><span className="font-semibold">Teléfono:</span> <a href="tel:70000000" className="text-amber-700 underline">70000000</a></p>
        <p><span className="font-semibold">Dirección:</span> Calle Falsa 123, Ciudad Dulce</p>
      </div>
      <p className="text-gray-600">¡Te responderemos lo antes posible!</p>
    </div>
  );
} 