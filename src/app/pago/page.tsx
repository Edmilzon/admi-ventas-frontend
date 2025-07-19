"use client"
import { useCartStore } from "@/store/cartStore";
import PaymentCard from "./components/tarjetaPago";
import Button from "@/components/common/Button/Button";
import { formatCurrency } from "@/lib/utils/helpers";
import Image from "next/image";

export default function PaymentPage() {
  const { products, getTotal, clear } = useCartStore();

  const total = getTotal();

  const handlePayment = () => {
    // Implementar lógica de pago
    alert('¡Gracias por tu compra! Tus mermeladas serán entregadas pronto.');
    clear();
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100 p-2">
            <Image
              src="/logo.jpeg"
              alt="Logo Mermeladas"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrito Vacío</h1>
          <p className="text-gray-600 mb-6">No hay mermeladas en tu carrito</p>
          <Button onClick={() => window.history.back()}>
            Volver a Mermeladas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 p-2">
            <Image
              src="/logo.jpeg"
              alt="Logo Mermeladas"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resumen de Compra</h1>
          <p className="text-gray-600">Revisa tus mermeladas seleccionadas</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg text-gray-600">Total a pagar:</span>
            <span className="text-4xl font-bold text-amber-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <PaymentCard
              key={product.id}
              id={product.id}
              nombre={product.nombre}
              imagen={product.imagen}
              precio={product.precio}
            />
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            onClick={handlePayment}
            className="flex-1 max-w-sm"
            size="lg"
          >
            Confirmar Compra
          </Button>
          <Button
            onClick={clear}
            variant="secondary"
            className="flex-1 max-w-sm"
            size="lg"
          >
            Vaciar Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
