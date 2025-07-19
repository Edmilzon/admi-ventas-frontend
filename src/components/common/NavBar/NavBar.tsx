"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/config/constants';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';

const navLinks = [
  { name: 'Home', href: ROUTES.DASHBOARD },
  { name: 'Productos', href: ROUTES.PRODUCTS },
  { name: 'Acerca de Nosotros', href: ROUTES.ABOUT },
  { name: 'Contacto', href: ROUTES.CONTACT },
];

export default function NavBar() {
  const pathname = usePathname() || "";

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="Logo" width={40} height={40} className="rounded-full object-cover" />
          <span className="font-extrabold text-amber-700 text-lg tracking-wide">Mermeladas</span>
        </Link>
        <ul className="flex gap-4 md:gap-8 items-center">
          {navLinks.map(link => {
            const isHome = link.href === ROUTES.DASHBOARD;
            const isActive =
              pathname === link.href ||
              (!isHome && pathname.startsWith(link.href) && pathname !== "/");
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-colors duration-200 text-sm md:text-base
                    ${isActive ? 'bg-amber-100 text-amber-700' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-4">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
} 