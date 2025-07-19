"use client";
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/common/Button/Button';
import { ROUTES } from '@/config';

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Ventas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema de administración de ventas para gestionar productos, 
            usuarios y transacciones de manera eficiente.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Dashboard Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Gestiona productos, visualiza estadísticas y administra tu inventario.
            </p>
            <Link href={ROUTES.DASHBOARD}>
              <Button className="w-full">
                Ir al Dashboard
              </Button>
            </Link>
          </div>

          {/* Authentication Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isAuthenticated ? 'Mi Cuenta' : 'Autenticación'}
            </h2>
            <p className="text-gray-6 mb-6">
              {isAuthenticated 
                ? 'Gestiona tu perfil y configuración de cuenta.'
                : 'Inicia sesión o regístrate para acceder al sistema.'
              }
            </p>
            {isAuthenticated ? (
              <div className="space-y-2">
                <Button 
                  onClick={logout}
                  variant="secondary" 
                  className="w-full"
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href={ROUTES.LOGIN}>
                  <Button className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button variant="secondary" className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagos</h2>
            <p className="text-gray-600 mb-6">
              Procesa pagos y gestiona transacciones de manera segura.
            </p>
            <Link href={ROUTES.PAYMENT}>
              <Button className="w-full">
                Ir a Pagos
              </Button>
            </Link>
          </div>
        </div>

        <footer className="text-center mt-16 text-gray-500">
          <p>&copy; 2024 Admin Ventas. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
} 