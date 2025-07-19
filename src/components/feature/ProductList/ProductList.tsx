import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils/helpers";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export default function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  const { nombre, descripcion, imagen, precio, id } = product;
  const priceNumber = parseFloat(precio);

  return (
    <div className="w-full max-w-sm">
      <Link href={`/producto/${id}`} className="block group">
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow w-full group-hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{nombre}</h1>
            <span className="text-xs text-gray-600 italic">{descripcion}</span>
            <h2 className="text-2xl font-bold text-gray-900">
              {formatCurrency(priceNumber)}
            </h2>
          </div>
          <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
            <Card imageUrl={imagen} alt={nombre} />
          </div>
        </div>
      </Link>
      <div className="flex gap-2 bg-gray-400 rounded-lg p-2 w-fit mt-2">
        <button
          onClick={onAddToCart}
          className="bg-white text-black w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Agregar al carrito"
        >
          <FaCartPlus />
        </button>
        <Button
          onClick={onBuyNow}
          variant="danger"
          size="sm"
          className="px-3 py-1"
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
