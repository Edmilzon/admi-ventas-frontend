"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-orange-600 animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-bounce">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="#fff" strokeWidth="4" fill="#fbbf24" />
            <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="2.2rem" fontWeight="bold" dy=".3em">AV</text>
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide animate-pulse">Admin Ventas</h1>
        <p className="text-lg text-white/80 animate-fade-in">Cargando aplicación...</p>
      </div>
    </div>
  );
}

// Animaciones Tailwind personalizadas (agrega en tu globals.css si no existen):
// .animate-fade-in { animation: fadeIn 1s ease-in; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } 