"use client";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/feature/ProductList/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/constants";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const { add, getItemCount } = useCartStore();
  const router = useRouter();

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Mermeladas</h1>
          <p className="text-lg text-gray-600">Elige tu favorita y agrégala al carrito</p>
        </div>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full">
            <span className="text-sm font-semibold">Carrito:</span>
            <span className="bg-white text-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {getItemCount()}
            </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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