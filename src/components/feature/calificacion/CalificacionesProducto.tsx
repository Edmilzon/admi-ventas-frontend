import { useState, useEffect } from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import { Calificacion, CalificacionPromedio } from '@/types/calificacion';
import { calificacionesService } from '@/lib/api/services/calificaciones';

interface CalificacionesProductoProps {
  productoId: number;
}

interface CalificacionStats {
  [key: number]: number; // 1-5 estrellas -> cantidad
}

export default function CalificacionesProducto({ productoId }: CalificacionesProductoProps) {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [promedio, setPromedio] = useState<CalificacionPromedio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [productoId]);

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (calificaciones.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaStar className="text-gray-400 text-2xl" />
        </div>
        <p className="text-gray-500 font-medium">Aún no hay calificaciones para este producto</p>
        <p className="text-gray-400 text-sm mt-2">¡Sé el primero en calificar!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Promedio Principal */}
      {promedio && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  {promedio.promedio.toFixed(1)}
                </div>
                <div className="flex items-center justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-lg ${
                        star <= Math.round(promedio.promedio)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-600">
                  Basado en <span className="font-semibold">{promedio.totalCalificaciones}</span> calificación{promedio.totalCalificaciones !== 1 ? 'es' : ''}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Última actualización: {new Date().toLocaleDateString('es-BO')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barras de Calificación (Estilo Google Play Store) */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Distribución de Calificaciones</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const cantidad = stats[stars] || 0;
            const porcentaje = totalCalificaciones > 0 ? (cantidad / totalCalificaciones) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-600">{stars}</span>
                  <FaStar className="text-yellow-500 text-sm" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${porcentaje}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-medium text-gray-600">
                    {cantidad}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Calificaciones */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 mb-3">Opiniones de Clientes</h4>
        {calificaciones.map((calificacion) => (
          <div key={calificacion.id} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-800">
                    {calificacion.usuario?.nombre || 'Usuario'}
                  </span>
                  <div className="flex items-center">
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
                  </div>
                  <span className="text-sm text-gray-500">
                    {calificacion.fecha && new Date(calificacion.fecha).toLocaleDateString('es-BO')}
                  </span>
                </div>
                {calificacion.comentario && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed font-medium">
                      &ldquo;{calificacion.comentario}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Mostrando {calificaciones.length} de {promedio?.totalCalificaciones || calificaciones.length} calificaciones
        </p>
      </div>
    </div>
  );
} 