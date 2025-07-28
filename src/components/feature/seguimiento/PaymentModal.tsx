import { FaCheckCircle, FaQrcode, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner/Spinner";
import { Pedido } from "@/types/pedido";
import { useState } from "react";
import CalificacionModal from "@/components/feature/calificacion/CalificacionModal";
import { useCalificaciones } from "@/hooks/useCalificaciones";
import { CalificacionFormData } from "@/types/calificacion";

interface PaymentModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

type PaymentMethod = 'qr' | 'efectivo' | null;

export default function PaymentModal({ 
  pedido, 
  isOpen, 
  onClose, 
  onConfirm, 
  loading 
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [showCalificacion, setShowCalificacion] = useState(false);
  const { crearCalificacion, loading: calificacionLoading } = useCalificaciones();

  const handleClose = () => {
    setPaymentMethod(null);
    setShowCalificacion(false);
    onClose();
  };

  const handleConfirmEfectivo = async () => {
    console.log('Confirmando pago en efectivo...');
    await onConfirm();
    console.log('Pago confirmado, mostrando calificación...');
    setPaymentMethod(null); // Reset payment method
    setShowCalificacion(true);
  };

  const handleConfirmQR = async () => {
    console.log('Confirmando pago con QR...');
    await onConfirm();
    console.log('Pago confirmado, mostrando calificación...');
    setPaymentMethod(null); // Reset payment method
    setShowCalificacion(true);
  };

  const handleCalificacionSubmit = async (data: CalificacionFormData) => {
    if (!pedido) return;
    
    try {
      // Calificar el primer producto del pedido (puedes modificar esto según tus necesidades)
      const primerProducto = pedido.detalles[0]?.producto;
      if (primerProducto) {
        await crearCalificacion(primerProducto.id, data);
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu calificación! Tu opinión es muy importante para nosotros.');
      }
      // Cerrar todo el modal después de calificar
      setShowCalificacion(false);
      setPaymentMethod(null);
      onClose();
    } catch (error) {
      console.error('Error al enviar calificación:', error);
      
      // Mostrar mensaje de error genérico
      let mensajeError = 'Error al enviar la calificación. Intenta de nuevo.';
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          mensajeError = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        } else if (error.message.includes('500')) {
          mensajeError = 'Error del servidor. Intenta más tarde.';
        } else {
          mensajeError = error.message;
        }
      }
      
      alert(mensajeError);
      
      // Aún cerramos el modal aunque falle la calificación
      setShowCalificacion(false);
      setPaymentMethod(null);
      onClose();
    }
  };

  const handleCalificacionClose = () => {
    setShowCalificacion(false);
    setPaymentMethod(null);
    onClose();
  };

  // Si no está abierto, no mostrar nada
  if (!isOpen || !pedido) return null;

  // Modal de calificación (prioridad más alta)
  if (showCalificacion && pedido) {
    console.log('Mostrando modal de calificación para:', pedido.detalles[0]?.producto?.nombre);
    const primerProducto = pedido.detalles[0]?.producto;
    return (
      <CalificacionModal
        isOpen={showCalificacion}
        onClose={handleCalificacionClose}
        onSubmit={handleCalificacionSubmit}
        productoNombre={primerProducto?.nombre || 'Producto'}
        loading={calificacionLoading}
      />
    );
  }

  // Si no se ha seleccionado método de pago, mostrar selección
  if (!paymentMethod) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 max-w-md md:max-w-lg w-full mx-2 md:mx-4 border border-gray-200">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <FaCreditCard className="text-green-600 text-2xl md:text-3xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
            Pagar Pedido #{pedido?.id}
          </h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">
            Total a pagar: <span className="font-bold text-xl md:text-2xl text-green-600">S/ {pedido?.total}</span>
          </p>
          <p className="text-gray-600 text-sm md:text-lg">
            Selecciona tu método de pago preferido
          </p>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {/* Opción QR */}
          <button
            onClick={() => setPaymentMethod('qr')}
            className="w-full p-4 md:p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-3 md:gap-4 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors flex-shrink-0">
              <FaQrcode className="text-green-600 text-xl md:text-2xl" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="font-bold text-gray-800 text-base md:text-lg">Pago con QR</div>
              <div className="text-gray-600 text-sm md:text-base">Escanea el código QR con tu app bancaria</div>
            </div>
          </button>

          {/* Opción Efectivo */}
          <button
            onClick={() => setPaymentMethod('efectivo')}
            className="w-full p-4 md:p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3 md:gap-4 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0">
              <FaMoneyBillWave className="text-blue-600 text-xl md:text-2xl" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="font-bold text-gray-800 text-base md:text-lg">Pago en Efectivo</div>
              <div className="text-gray-600 text-sm md:text-base">Paga al momento de la entrega</div>
            </div>
          </button>
        </div>
        
        <div className="mt-6 md:mt-8">
          <button
            onClick={handleClose}
            className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold text-base md:text-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
      </div>
    );
  }

  // Mostrar QR
  if (paymentMethod === 'qr') {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 max-w-md md:max-w-lg w-full mx-2 md:mx-4 border border-gray-200">
        <div className="text-center mb-4 md:mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <FaQrcode className="text-green-600 text-2xl md:text-3xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Pago con QR - Pedido #{pedido?.id}
          </h3>
          <p className="text-gray-600 text-sm md:text-lg">
            Escanea el código QR para realizar el pago
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="text-center mb-3 md:mb-4">
            <p className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Total a pagar: S/ {pedido?.total}
            </p>
            <p className="text-gray-600 text-sm md:text-base">Referencia: Mermelada Sumaq</p>
          </div>
          
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="bg-white p-3 md:p-6 rounded-xl shadow-lg border-2 border-green-200">
              <Image
                src="/banco.jpeg"
                alt="QR Code para pago"
                width={200}
                height={200}
                className="rounded-lg w-48 h-48 md:w-64 md:h-64 object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={() => setPaymentMethod(null)}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold text-base md:text-lg"
            disabled={loading}
          >
            Volver
          </button>
          <button
            onClick={handleConfirmQR}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                Confirmando...
              </>
            ) : (
              <>
                <FaCheckCircle size={16} className="md:w-5 md:h-5" />
                Confirmar Pago
              </>
            )}
          </button>
        </div>
      </div>
      </div>
    );
  }

  // Mostrar confirmación de efectivo
  if (paymentMethod === 'efectivo') {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-8 max-w-md md:max-w-lg w-full mx-2 md:mx-4 border border-gray-200">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <FaMoneyBillWave className="text-blue-600 text-2xl md:text-3xl" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
            Pago en Efectivo - Pedido #{pedido?.id}
          </h3>
          <p className="text-gray-600 text-sm md:text-lg">
            Confirmar pago en efectivo al momento de la entrega
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <div className="text-center mb-4 md:mb-6">
            <p className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
              Total a pagar: S/ {pedido?.total}
            </p>
            <p className="text-blue-700 text-sm md:text-lg">
              Pagarás en efectivo cuando recibas tu pedido
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-4 md:p-6 border border-blue-200">
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">💵</div>
              <p className="font-bold text-gray-800 text-lg md:text-xl">Pago en Efectivo</p>
              <p className="text-gray-600 mt-2 text-sm md:text-lg">
                El pago se realizará al momento de la entrega
              </p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-blue-600 font-medium text-sm md:text-base">
              El pedido se marcará como confirmado
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={() => setPaymentMethod(null)}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors font-semibold text-base md:text-lg"
            disabled={loading}
          >
            Volver
          </button>
          <button
            onClick={handleConfirmEfectivo}
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                Confirmando...
              </>
            ) : (
              <>
                <FaCheckCircle size={16} className="md:w-5 md:h-5" />
                Confirmar Pago
              </>
            )}
          </button>
        </div>
      </div>
      </div>
    );
  }

  return null;
} 