"use client";
import { useCartStore } from "@/store/cartStore";
import SearchBar from "@/components/common/Header/Header";
import ProductCard from "@/components/feature/ProductList/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Product } from "@/types/product";

export default function Dashboard() {
  const { products, loading, error } = useProducts();
  const { add } = useCartStore();
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

  const handleSearch = (query: string) => {
    console.log('Buscando:', query);
  };
  
  return (
    <div className="w-full min-h-screen bg-white px-4 py-6 flex flex-col items-center gap-4">
      
      <div className="w-96 h-40 bg-amber-500 rounded-bl-[50px] rounded-br-[50px] flex items-center justify-center">
        <SearchBar 
          placeholder="Buscar productos..." 
          onSearch={handleSearch}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Spinner size="lg" />
          <span className="ml-2 text-gray-500">Cargando productos...</span>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center py-8">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
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
  );
} 