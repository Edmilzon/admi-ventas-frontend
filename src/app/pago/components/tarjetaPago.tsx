"use client";

import Card from "@/components/common/Card/Card";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/helpers";

interface PaymentCardProps {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
}

export default function PaymentCard({ id, nombre, imagen, precio }: PaymentCardProps) {
  const { products, updateQuantity, remove } = useCartStore();

  const product = products.find((p) => p.id === id);

  if (!product) return null; 

  const increaseQuantity = () => updateQuantity(id, product.cantidad + 1);
  const decreaseQuantity = () =>
    product.cantidad > 1
      ? updateQuantity(id, product.cantidad - 1)
      : remove(id);

  const removeProduct = () => remove(id);

  return (
    <div className="w-full max-w-sm relative">
      <button
        onClick={removeProduct}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold z-10"
        aria-label="Eliminar producto"
      >
        ×
      </button>

      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-lg w-full border">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-sm font-bold text-gray-900">{nombre}</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            {formatCurrency(precio * product.cantidad)}
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 rounded bg-gray-300 text-lg font-bold hover:bg-gray-400 transition-colors"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="text-md font-semibold min-w-[2rem] text-center">
              {product.cantidad}
            </span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 rounded bg-gray-300 text-lg font-bold hover:bg-gray-400 transition-colors"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
          <Card imageUrl={imagen} alt={nombre} />
        </div>
      </div>
    </div>
  );
}
