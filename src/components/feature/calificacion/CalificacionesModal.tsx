import { useState, useEffect } from 'react';
import { FaStar, FaUser, FaTimes } from 'react-icons/fa';
import { Calificacion, CalificacionPromedio } from '@/types/calificacion';
import { calificacionesService } from '@/lib/api/services/calificaciones';
import Spinner from '@/components/ui/Spinner/Spinner';

interface CalificacionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  productoId: number;
  productoNombre: string;
}

interface CalificacionStats {
  [key: number]: number; // 1-5 estrellas -> cantidad
}

export default function CalificacionesModal({ 
  isOpen, 
  onClose, 
  productoId, 
  productoNombre 
}: CalificacionesModalProps) {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [promedio, setPromedio] = useState<CalificacionPromedio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && productoId) {
      const cargarCalificaciones = async () => {
        try {
          setLoading(true);
          const [calificacionesData, promedioData] = await Promise.all([
            calificacionesService.getCalificacionesProducto(productoId),
            calificacionesService.getPromedioCalificaciones(productoId)
          ]);
          setCalificaciones(calificacionesData);
          setPromedio(promedioData);
        } catch (error) {
          console.error('Error al cargar calificaciones:', error);
        } finally {
          setLoading(false);
        }
      };

      cargarCalificaciones();
    }
  }, [isOpen, productoId]);

  // Calcular estadísticas de calificaciones
  const calcularStats = (): CalificacionStats => {
    const stats: CalificacionStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    calificaciones.forEach(cal => {
      stats[cal.calificacion] = (stats[cal.calificacion] || 0) + 1;
    });
    return stats;
  };

  const stats = calcularStats();
  const totalCalificaciones = calificaciones.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
              <FaStar className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">
                Calificaciones de {productoNombre}
              </h3>
              <p className="text-gray-600 text-lg">Opiniones de nuestros clientes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <FaTimes className="text-gray-500 text-xl" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" />
            <span className="ml-4 text-gray-600 text-lg">Cargando calificaciones...</span>
          </div>
        ) : calificaciones.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-300 text-8xl mb-6">⭐</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              Aún no hay calificaciones
            </h3>
            <p className="text-gray-500 text-lg">
              Sé el primero en calificar este producto
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header con Promedio (Estilo Google Play Store) */}
            {promedio && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 shadow-lg">
                <div className="flex items-start gap-8">
                  {/* Promedio Principal */}
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800 mb-3">
                      {promedio.promedio.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-xl ${
                            star <= Math.round(promedio.promedio)
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {promedio.totalCalificaciones} opinión{promedio.totalCalificaciones !== 1 ? 'es' : ''}
                    </div>
                  </div>

                  {/* Barras de Calificación (Estilo Google Play Store) */}
                  <div className="flex-1">
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const cantidad = stats[stars] || 0;
                        const porcentaje = totalCalificaciones > 0 ? (cantidad / totalCalificaciones) * 100 : 0;
                        
                        return (
                          <div key={stars} className="flex items-center gap-4">
                            <div className="flex items-center gap-2 w-12">
                              <span className="text-sm font-semibold text-gray-700">{stars}</span>
                              <FaStar className="text-yellow-500 text-sm" />
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-3 shadow-inner">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${porcentaje}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de calificaciones */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <h4 className="text-xl font-bold text-gray-800">
                  Todas las opiniones
                </h4>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {calificaciones.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {calificaciones.map((calificacion) => (
                  <div key={calificacion.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-sm">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-lg">
                            {calificacion.usuario?.nombre || 'Cliente'}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`text-sm ${
                                  star <= calificacion.calificacion
                                    ? 'text-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 font-medium ml-2">
                              {calificacion.calificacion}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      {calificacion.fecha && (
                        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                          {new Date(calificacion.fecha).toLocaleDateString('es-BO', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                    </div>
                    
                    {calificacion.comentario && (
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <p className="text-gray-700 text-sm leading-relaxed font-medium">
                          &ldquo;{calificacion.comentario}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Botón de cerrar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 font-bold text-lg shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 