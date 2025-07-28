import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Spinner from '@/components/ui/Spinner/Spinner';
import { CalificacionFormData } from '@/types/calificacion';

interface CalificacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CalificacionFormData) => Promise<void>;
  productoNombre: string;
  loading: boolean;
}

export default function CalificacionModal({
  isOpen,
  onClose,
  onSubmit,
  productoNombre,
  loading
}: CalificacionModalProps) {
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (calificacion === 0) return;
    
    await onSubmit({
      calificacion,
      comentario
    });
    
    // Reset form
    setCalificacion(0);
    setComentario('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 max-w-sm md:max-w-md w-full mx-2 md:mx-4 border border-gray-200">
        <div className="text-center mb-4 md:mb-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <FaStar className="text-yellow-600 text-xl md:text-2xl" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            ¡Gracias por tu compra!
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Califica tu experiencia con: <span className="font-semibold">{productoNombre}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Estrellas de calificación */}
          <div className="text-center">
            <p className="text-gray-700 mb-2 md:mb-3 font-medium text-sm md:text-base">¿Cómo calificarías este producto?</p>
            <div className="flex justify-center gap-1 md:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCalificacion(star)}
                  className={`text-2xl md:text-3xl transition-colors ${
                    star <= calificacion
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
            {calificacion > 0 && (
              <p className="text-xs md:text-sm text-gray-600 mt-2">
                {calificacion === 1 && 'Muy malo'}
                {calificacion === 2 && 'Malo'}
                {calificacion === 3 && 'Regular'}
                {calificacion === 4 && 'Bueno'}
                {calificacion === 5 && 'Excelente'}
              </p>
            )}
          </div>

          {/* Comentario */}
          <div>
            <label htmlFor="comentario" className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
              Comentario (opcional)
            </label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Comparte tu experiencia con este producto..."
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-sm md:text-base"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {comentario.length}/500
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold text-sm md:text-base"
              disabled={loading}
            >
              Más tarde
            </button>
            <button
              type="submit"
              disabled={calificacion === 0 || loading}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Enviando...
                </>
              ) : (
                <>
                  <FaStar size={14} className="md:w-4 md:h-4" />
                  Enviar Calificación
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 