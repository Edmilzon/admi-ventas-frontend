import Link from 'next/link';

export default function UsuariosPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col gap-6 border border-black items-center">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Bienvenido a Usuarios</h1>
        <Link href="/usuarios/login" className="w-full py-2 bg-black text-white font-bold rounded hover:bg-white hover:text-black border border-black text-center transition-colors duration-200">Iniciar Sesión</Link>
        <Link href="/usuarios/registro" className="w-full py-2 bg-black text-white font-bold rounded hover:bg-white hover:text-black border border-black text-center transition-colors duration-200">Registrarse</Link>
      </div>
    </div>
  );
} 