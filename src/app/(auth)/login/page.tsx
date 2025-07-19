"use client"
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { ROUTES } from '@/config';

export default function LoginPage() {
  const [form, setForm] = useState({
    correo: '',
    contrasena: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(form);
      if (result.success) {
        router.push(ROUTES.DASHBOARD);
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error inesperado. Inténtalo de nuevo.');
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
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="email"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="contrasena" className="text-black font-semibold">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            value={form.contrasena}
            onChange={handleChange}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="current-password"
          />
        </div>
        
        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>
        
        <Link
          href={ROUTES.REGISTER}
          className="w-full py-2 mt-4 bg-white text-black font-bold rounded hover:bg-black hover:text-white border border-black text-center transition-colors duration-200 block"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </div>
  );
} 