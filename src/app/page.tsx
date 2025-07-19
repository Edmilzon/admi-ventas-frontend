"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <div className="w-24 h-24 rounded-full bg-white p-2 shadow-lg">
            <Image
              src="/logo.jpeg"
              alt="Logo Mermeladas"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide animate-pulse">
          Mermeladas Artesanales
        </h1>
        <p className="text-lg text-white/80 animate-fade-in">Cargando dulzura...</p>
      </div>
    </div>
  );
}

// Animaciones Tailwind personalizadas (agrega en tu globals.css si no existen):
// .animate-fade-in { animation: fadeIn 1s ease-in; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } 