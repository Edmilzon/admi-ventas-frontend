import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils/helpers";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export default function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  const { nombre, descripcion, imagen, precio } = product;
  const priceNumber = parseFloat(precio);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow w-full">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-sm font-bold text-gray-900">{nombre}</h1>
          <span className="text-xs text-gray-600 italic">{descripcion}</span>
          <h2 className="text-2xl font-bold text-gray-900">
            {formatCurrency(priceNumber)}
          </h2>

          {/* Botones */}
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

        <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
          <Card imageUrl={imagen} alt={nombre} />
        </div>
      </div>
    </div>
  );
}
