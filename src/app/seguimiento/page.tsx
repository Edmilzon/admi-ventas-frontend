"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner/Spinner";
import { 
  usePedidos, 
  PedidoCard, 
  PaymentModal, 
  CancelModal, 
  TabsPedidos, 
  LocationsSection,
  getPedidosByEstado,
  ESTADOS
} from "@/components/feature/seguimiento";
import { Pedido } from "@/types/pedido";
import { openAllLocationsMap } from "@/lib/utils/maps";

export default function SeguimientoPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pendiente");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [pedidoToAction, setPedidoToAction] = useState<Pedido | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const {
    pedidos,
    loading,
    error,
    confirmarPago,
    confirmarCancelacion
  } = usePedidos();

  // Verificar autenticación y redirigir si es necesario
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Si no está autenticado, mostrar loading mientras redirige
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  const handleVerTodosLosPuntos = () => {
    openAllLocationsMap();
  };

  const handlePagar = (pedido: Pedido) => {
    setPedidoToAction(pedido);
    setShowPaymentModal(true);
  };

  const handleCancelar = (pedido: Pedido) => {
    setPedidoToAction(pedido);
    setShowCancelModal(true);
  };

  const handleConfirmarPago = async () => {
    if (!pedidoToAction) return;
    
    setActionLoading(true);
    const success = await confirmarPago(pedidoToAction.id);
    if (success) {
      // No cerrar el modal aquí, el PaymentModal se encargará de mostrar la calificación
      // setShowPaymentModal(false);
      // setPedidoToAction(null);
    }
    setActionLoading(false);
  };

  const handleConfirmarCancelacion = async () => {
    if (!pedidoToAction) return;
    
    setActionLoading(true);
    const success = await confirmarCancelacion(pedidoToAction.id);
    if (success) {
      setShowCancelModal(false);
      setPedidoToAction(null);
    }
    setActionLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Cargando tus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-700 mb-2">Seguimiento de Pedidos</h1>
          <p className="text-gray-600">Revisa el estado de tus pedidos y ubicaciones de entrega</p>
        </div>

        {/* Lista de Pedidos con Pestañas */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Mis Pedidos</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mb-4">
              {error}
            </div>
          )}

          {pedidos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes pedidos aún</h3>
              <p className="text-gray-500">Realiza tu primer pedido para verlo aquí</p>
              <button
                onClick={() => router.push("/productos")}
                className="mt-4 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Ir a Productos
              </button>
            </div>
          ) : (
            <div>
              {/* Pestañas */}
              <TabsPedidos 
                pedidos={pedidos}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Contenido de la pestaña activa */}
              <div className="min-h-[400px]">
                {(() => {
                  const pedidosEnTab = getPedidosByEstado(pedidos, activeTab);
                  const estado = ESTADOS[activeTab as keyof typeof ESTADOS];
                  
                  if (pedidosEnTab.length === 0) {
                    return (
                      <div className={`text-center py-12 ${estado.bgColor} rounded-lg border ${estado.borderColor}`}>
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          No tienes pedidos {estado.label.toLowerCase()}
                        </h3>
                        <p className="text-gray-500">
                          {activeTab === 'pendiente' && 'Tus pedidos aparecerán aquí cuando los realices'}
                          {activeTab === 'vendido' && 'Los pedidos confirmados aparecerán aquí'}
                          {activeTab === 'cancelado' && 'Los pedidos cancelados aparecerán aquí'}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-4">
                      {pedidosEnTab.map((pedido) => (
                        <PedidoCard
                          key={pedido.id}
                          pedido={pedido}
                          onPagar={handlePagar}
                          onCancelar={handleCancelar}
                        />
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Sección de Ubicaciones */}
        <LocationsSection onVerTodosLosPuntos={handleVerTodosLosPuntos} />
      </div>

      {/* Modal de Pago */}
      <PaymentModal
        pedido={pedidoToAction}
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handleConfirmarPago}
        loading={actionLoading}
      />

      {/* Modal de Cancelación */}
      <CancelModal
        pedido={pedidoToAction}
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmarCancelacion}
        loading={actionLoading}
      />
    </div>
  );
} 