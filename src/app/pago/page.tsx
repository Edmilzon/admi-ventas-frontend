"use client"
import { useCartStore } from "@/store/cartStore";
import PaymentCard from "./components/tarjetaPago";
import Button from "@/components/common/Button/Button";
import { formatCurrency } from "@/lib/utils/helpers";

export default function PaymentPage() {
  const { products, getTotal, clear } = useCartStore();

  const total = getTotal();

  const handlePayment = () => {
    // Implementar lógica de pago
    alert('Pago procesado exitosamente');
    clear();
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrito Vacío</h1>
          <p className="text-gray-600 mb-6">No hay productos en tu carrito</p>
          <Button onClick={() => window.history.back()}>
            Volver a Productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resumen de Compra</h1>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg text-gray-600">Total:</span>
            <span className="text-4xl font-bold text-gray-900">
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
            Procesar Pago
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
