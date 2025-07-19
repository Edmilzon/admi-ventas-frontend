import Card from "../../common/Card/Card";
import Button from "../../common/Button/Button";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils/helpers";
import Link from "next/link";
import { ROUTES } from "@/config/constants";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductCard({ product, quantity, onIncrement, onDecrement }: ProductCardProps) {
  const { nombre, descripcion, imagen, precio, stock } = product;
  const priceNumber = parseFloat(precio);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    // onAddToCart && onAddToCart();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
      return;
    }
    // onBuyNow && onBuyNow();
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow w-full">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-sm font-bold text-gray-900">{nombre}</h1>
          <span className="text-xs text-gray-600 italic">{descripcion}</span>
          <h2 className="text-2xl font-bold text-gray-900">
            {formatCurrency(priceNumber)}
          </h2>
        </div>
        <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
          <Card imageUrl={imagen} alt={nombre} />
        </div>
      </div>
      <div className="flex gap-2 bg-gray-400 rounded-lg p-2 w-fit mt-2 items-center justify-center">
        <button
          onClick={onDecrement}
          className="bg-white text-black w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Restar"
          disabled={quantity <= 0}
        >
          -
        </button>
        <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
        <button
          onClick={onIncrement}
          className="bg-white text-black w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Sumar"
          disabled={stock !== undefined && quantity >= stock}
        >
          +
        </button>
      </div>
    </div>
  );
}
