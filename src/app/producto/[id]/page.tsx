"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Spinner from "@/components/ui/Spinner/Spinner";
import { formatCurrency } from "@/lib/utils/helpers";
import { mockProducts } from "@/lib/utils/mockData";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { add } = useCartStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    
    // Simular carga de datos
    const fetchProduct = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundProduct = mockProducts.find(p => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Producto no encontrado");
        }
      } catch {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    add({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      precio: parseFloat(product.precio),
      cantidad: quantity,
    });
    router.push("/pago");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
        <span className="ml-2 text-gray-500">Cargando mermelada...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || "Mermelada no encontrada"}</h1>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full flex flex-col items-center gap-6">
        <Card imageUrl={product.imagen} alt={product.nombre} className="w-40 h-40" />
        <h1 className="text-3xl font-bold text-gray-900 text-center">{product.nombre}</h1>
        <p className="text-gray-600 text-center mb-2">{product.descripcion}</p>
        <div className="text-2xl font-bold text-amber-600 mb-4">{formatCurrency(parseFloat(product.precio))}</div>
        <div className="text-sm text-gray-500 mb-4">Stock disponible: {product.stock} unidades</div>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-semibold">Cantidad:</span>
          <button
            className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300 transition-colors"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
          <button
            className="w-8 h-8 rounded bg-gray-200 text-lg font-bold hover:bg-gray-300 transition-colors"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        <Button onClick={handleAddToCart} size="lg" className="w-full">
          Añadir al carrito
        </Button>
        <Button onClick={() => router.back()} variant="secondary" className="w-full">
          Volver a mermeladas
        </Button>
      </div>
    </div>
  );
} 