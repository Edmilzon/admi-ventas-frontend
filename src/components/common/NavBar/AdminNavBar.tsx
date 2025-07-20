'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ClipboardDocumentListIcon, 
  CubeIcon, 
  UsersIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const adminLinks = [
  { href: '/admin', label: 'Lista de pedidos', icon: ClipboardDocumentListIcon },
  { href: '/admin/productos', label: 'Productos', icon: CubeIcon },
  { href: '/admin/usuarios', label: 'Usuarios', icon: UsersIcon }, // Placeholder
  { href: '/admin/reportes', label: 'Reportes', icon: ChartBarIcon },
];

export default function AdminNavBar() {
  const pathname = usePathname();
  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-gradient-to-b from-amber-900 to-amber-800 shadow-xl z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-amber-700">
          <div className="text-2xl font-bold text-white tracking-wide">Panel Admin</div>
          <div className="text-amber-200 text-sm mt-1">Gestión de Ventas</div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {adminLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'text-amber-100 hover:bg-amber-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-amber-300 group-hover:text-white'}`} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-amber-700">
          <div className="text-amber-200 text-xs text-center">
            Sistema de Administración
          </div>
        </div>
      </div>
    </div>
  );
} 