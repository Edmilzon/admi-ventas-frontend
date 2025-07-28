import { FaTimes } from "react-icons/fa";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Pedido } from "@/types/pedido";

interface CancelModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function CancelModal({ 
  pedido, 
  isOpen, 
  onClose, 
  onConfirm, 
  loading 
}: CancelModalProps) {
  if (!isOpen || !pedido) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Cancelar Pedido #{pedido.id}
          </h3>
          <p className="text-gray-600">
            ¿Estás seguro de que quieres cancelar este pedido?
          </p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">
            <strong>⚠️ Atención:</strong> Esta acción no se puede deshacer. 
            El pedido se marcará como cancelado.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
            disabled={loading}
          >
            No, mantener
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                Cancelando...
              </>
            ) : (
              <>
                <FaTimes size={16} />
                Sí, cancelar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 