"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils/helpers";
import { openGoogleMaps } from "@/lib/utils/maps";
import { generateWhatsAppMessage, sendWhatsAppMessage } from "@/lib/utils/whatsapp";
import LocationSelector from "@/components/ui/LocationSelector/LocationSelector";
import { DELIVERY_LOCATIONS } from "@/config/locations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

export default function DetallePedidoPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { products, getTotal, clear } = useCartStore();
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [fechaEntrega, setFechaEntrega] = useState<Date | null>(null);
  const [horaEntrega, setHoraEntrega] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // Calcular el total
  const total = getTotal();

  // Obtener la ubicación seleccionada
  const selectedLocation = DELIVERY_LOCATIONS.find(loc => loc.id === selectedLocationId);

  // Función para obtener la fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Función para obtener la fecha máxima (30 días desde hoy)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate;
  };

  // Función para filtrar horas disponibles (8:00 AM - 8:00 PM)
  const filterTime = (time: Date) => {
    const hour = time.getHours();
    return hour >= 8 && hour <= 20;
  };

  const handleLocationChange = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  const handleConfirmar = async () => {
    if (!user) {
      alert("Debes iniciar sesión para realizar un pedido");
      return;
    }

    if (!selectedLocationId) {
      alert("Debes seleccionar una ubicación de entrega");
      return;
    }

    if (!fechaEntrega) {
      alert("Debes seleccionar una fecha de entrega");
      return;
    }

    if (!horaEntrega) {
      alert("Debes seleccionar una hora de entrega");
      return;
    }

    setLoading(true);

    try {
      // Combinar fecha y hora
      const fechaHoraEntrega = new Date(fechaEntrega);
      fechaHoraEntrega.setHours(horaEntrega.getHours(), horaEntrega.getMinutes(), 0, 0);

      const payload = {
        usuarioId: user.id,
        direccion: selectedLocation?.name || "",
        fechaEntrega: fechaHoraEntrega.toISOString(),
        detalles: products.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
          precio: item.precio
        })),
      };

      const response = await fetch("https://admi-ventas-backend.onrender.com/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const orderData = await response.json();
        
        // Limpiar carrito
        clear();

        // Generar y enviar mensaje de WhatsApp
        const orderDetails = {
          orderId: orderData.id || "N/A",
          total: total,
          products: products,
          location: selectedLocation?.name || "",
          fechaEntrega: fechaHoraEntrega.toISOString(),
          horaEntrega: horaEntrega.toISOString(),
          userName: user.nombre || user.correo || "Cliente"
        };

        const whatsappMessage = generateWhatsAppMessage(orderDetails);
        sendWhatsAppMessage(whatsappMessage);

        // Si no es WhatsApp, abrir Google Maps
        if (selectedLocationId !== "whatsapp" && selectedLocation) {
          openGoogleMaps(selectedLocation);
        }

        // Redirigir a seguimiento
        router.push("/seguimiento");
      } else {
        const errorData = await response.json();
        alert(`Error al registrar el pedido: ${errorData.message || "Error desconocido"}`);
      }
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
      alert("Error al registrar el pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Estados de validación
  const isLocationSelected = !!selectedLocationId;
  const isDateSelected = !!fechaEntrega;
  const isTimeSelected = !!horaEntrega;
  const isFormComplete = isLocationSelected && isDateSelected && isTimeSelected;

  if (!user) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acceso Requerido
          </h1>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para realizar un pedido
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingCart className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Carrito Vacío
          </h1>
          <p className="text-gray-600 mb-6">
            No hay productos en tu carrito de compras
          </p>
          <button
            onClick={() => router.push("/productos")}
            className="bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            Explorar Productos
          </button>
          </div>
          </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <FaTruck className="text-yellow-600 text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Confirmar Pedido
          </h1>
          <p className="text-gray-600 text-lg">
            Revisa los detalles y confirma tu pedido
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Productos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Productos del Carrito */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FaShoppingCart className="text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Productos en el Carrito
                </h2>
                <span className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>
              
              <div className="space-y-4">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-yellow-800">
                        {item.cantidad}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(item.precio)} por unidad
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-lg">
                        {formatCurrency(item.cantidad * item.precio)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total del Pedido:</span>
                  <span className="text-3xl font-bold text-yellow-600">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Información de Entrega */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ubicación de Entrega */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Ubicación de Entrega
                  </h3>
                </div>
                <LocationSelector
                  value={selectedLocationId}
                  onChange={handleLocationChange}
                />
                {isLocationSelected && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      <span className="text-sm text-green-800 font-medium">
                        Ubicación seleccionada
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fecha y Hora */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Fecha y Hora
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {/* Fecha */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Entrega
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={fechaEntrega}
                        onChange={(date) => setFechaEntrega(date)}
                        minDate={getMinDate()}
                        maxDate={getMaxDate()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona fecha"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Hora */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hora de Entrega
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={horaEntrega}
                        onChange={(time) => setHoraEntrega(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Hora"
                        dateFormat="HH:mm"
                        placeholderText="Selecciona hora"
                        filterTime={filterTime}
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                      />
                      <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 font-medium">
                    <strong>Horario de entrega:</strong> 8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen y Confirmación */}
          <div className="space-y-6">
            {/* Resumen del Pedido */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Resumen del Pedido
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Productos:</span>
                  <span className="font-semibold text-gray-800">{products.length}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ubicación:</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[150px] truncate">
                    {selectedLocation?.name || "No seleccionada"}
                  </span>
                </div>
                
                {fechaEntrega && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Fecha:</span>
                    <span className="font-semibold text-gray-800">
                      {fechaEntrega.toLocaleDateString('es-BO')}
                    </span>
                  </div>
                )}
                
                {horaEntrega && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-semibold text-gray-800">
                      {horaEntrega.toLocaleTimeString('es-BO', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
          </div>
        )}
                
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <button
          onClick={handleConfirmar}
                disabled={loading || !isFormComplete}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Procesando Pedido...
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" />
                    Confirmar Pedido
                  </>
                )}
        </button>
              
              {!isFormComplete && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 text-center font-medium">
                    Completa todos los campos para confirmar el pedido
                  </p>
                </div>
              )}
      </div>
          </div>
        </div>
      </div>
    </div>
  );
} 