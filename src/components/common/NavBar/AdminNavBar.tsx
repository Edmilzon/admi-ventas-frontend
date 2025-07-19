'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminLinks = [
  { href: '/admin', label: 'Lista de pedidos' },
  { href: '/admin/productos', label: 'Productos' },
  { href: '/admin/usuarios', label: 'Usuarios' }, // Placeholder
];

export default function AdminNavBar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-amber-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">Panel Administrador</div>
        <div className="flex gap-6">
          {adminLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold px-3 py-2 rounded transition-colors duration-200 ${pathname === link.href ? 'bg-amber-700' : 'hover:bg-amber-800'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 