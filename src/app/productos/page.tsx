"use client";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/feature/ProductList/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/constants";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const { add, getItemCount, clear } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product: Product) => {
    add({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      precio: parseFloat(product.precio),
      cantidad: 1,
    });
  };

  const handleBuyNow = (product: Product) => {
    add({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      precio: parseFloat(product.precio),
      cantidad: 1,
    });
    router.push(ROUTES.PAYMENT);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 px-4 py-10 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Mermeladas</h1>
            <p className="text-lg text-gray-600">Elige tu favorita y agrégala al carrito</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="relative">
              <FaShoppingCart className="text-3xl text-amber-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                {mounted ? getItemCount() : 0}
              </span>
            </div>
            <button
              onClick={clear}
              className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-red-100 text-red-600 transition-colors"
              title="Vaciar carrito"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
            <span className="ml-2 text-gray-500">Cargando mermeladas...</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-8">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div
            className={`grid gap-6 mx-auto w-fit
              ${products.length === 1 ? 'grid-cols-1' : ''}
              ${products.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
              ${products.length >= 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}
            `}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onBuyNow={() => handleBuyNow(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 