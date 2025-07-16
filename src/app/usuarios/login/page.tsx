"use client"
import React, { useState } from 'react';
import { loginUsuario } from '@/services/usuariosService';
import Link from 'next/link';

// Página de Login de Usuario
export default function LoginUsuario() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUsuario({ correo, contrasena });
      // Usa data si es necesario, si no, elimina la variable
      alert('¡Login exitoso!');
    } catch (error: unknown) {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col gap-6 border border-black"
      >
        <h1 className="text-3xl font-bold text-center text-black mb-2">Iniciar Sesión</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="correo" className="text-black font-semibold">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contrasena" className="text-black font-semibold">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-2 bg-black text-white font-bold rounded hover:bg-white hover:text-black border border-black transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <Link
          href="/usuarios/registro"
          className="w-full py-2 mt-4 bg-white text-black font-bold rounded hover:bg-black hover:text-white border border-black text-center transition-colors duration-200 block"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </div>
  );
} 