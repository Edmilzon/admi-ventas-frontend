"use client";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils/helpers";
import { registrarPedido } from "@/lib/api/services/pedidos";

const WHATSAPP_NUMBER = "59163878067";

export default function DetallePedidoPage() {
  const { products, getTotal, clear } = useCartStore();
  const { user } = useAuthStore();
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleConfirmar = async () => {
    if (!user?.id || !direccion || products.length === 0) return;
    setLoading(true);
    try {
      // Construir payload para la API
      const payload = {
        usuarioId: user.id,
        direccion,
        detalles: products.map(p => ({
          productoId: p.id,
          cantidad: p.cantidad,
          precio: p.precio
        }))
      };
      // Usar servicio profesional para registrar el pedido
      await registrarPedido(payload);
      // Preparar mensaje para WhatsApp
      let mensaje = `¡Hola! Quiero realizar el siguiente pedido:%0A`;
      mensaje += `Nombre: ${user.nombre || "-"}%0A`;
      mensaje += `Teléfono: ${user.telf || "-"}%0A`;
      mensaje += `Dirección: ${direccion}%0A`;
      mensaje += `%0A*Productos:*%0A`;
      products.forEach(p => {
        mensaje += `- ${p.nombre} x${p.cantidad} (${formatCurrency(p.precio * p.cantidad)})%0A`;
      });
      mensaje += `%0A*Total:* ${formatCurrency(getTotal())}`;
      // Limpiar carrito y redirigir a WhatsApp
      clear();
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
    } catch (err) {
      alert("Ocurrió un error al registrar el pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-amber-700 text-center mb-4">Detalle del Pedido</h1>
        <div>
          <h2 className="text-xl font-semibold mb-2">Productos seleccionados:</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {products.length === 0 && <li className="py-2 text-gray-500">No hay productos en el carrito.</li>}
            {products.map((p) => (
              <li key={p.id} className="flex justify-between items-center py-2">
                <span>{p.nombre} <span className="text-sm text-gray-500">x{p.cantidad}</span></span>
                <span>{formatCurrency(p.precio * p.cantidad)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>{formatCurrency(getTotal())}</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Datos del usuario</h2>
          <div className="mb-2">
            <span className="font-medium">Nombre:</span> {user?.nombre || "-"}
          </div>
          <div className="mb-2">
            <span className="font-medium">Correo:</span> {user?.correo || "-"}
          </div>
          <div className="mb-2">
            <span className="font-medium">Teléfono:</span> {user?.telf || "-"}
          </div>
          <div className="mb-2">
            <label className="font-medium block mb-1" htmlFor="direccion">Dirección de pedido:</label>
            <input
              id="direccion"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Ingresa la dirección de entrega"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-lg text-2xl shadow-lg transition-colors disabled:opacity-50"
          onClick={handleConfirmar}
          disabled={products.length === 0 || !direccion || loading}
        >
          {loading ? "Enviando pedido..." : "Confirmar pedido"}
        </button>
      </div>
    </div>
  );
} 