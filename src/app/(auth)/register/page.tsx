"use client"
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { ROUTES } from '@/config';

export default function RegisterPage() {
  const [form, setForm] = useState({
    correo: '',
    nombre: '',
    contrasena: '',
    direccion: '',
    telf: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const result = await register(form);
      if (result.success) {
        setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setForm({ correo: '', nombre: '', contrasena: '', direccion: '', telf: '' });
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 2000);
      } else {
        setError(result.error || 'Error al registrar usuario');
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
        <h1 className="text-3xl font-bold text-center text-black mb-2">Registro de Usuario</h1>
        
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
          <label htmlFor="nombre" className="text-black font-semibold">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="name"
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
            autoComplete="new-password"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="direccion" className="text-black font-semibold">Dirección</label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            value={form.direccion}
            onChange={handleChange}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="street-address"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="telf" className="text-black font-semibold">Teléfono</label>
          <input
            id="telf"
            name="telf"
            type="tel"
            value={form.telf}
            onChange={handleChange}
            className="px-4 py-2 border border-black rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-black transition"
            required
            autoComplete="tel"
          />
        </div>
        
        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
        {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
        
        <Link
          href={ROUTES.LOGIN}
          className="w-full py-2 mt-4 bg-white text-black font-bold rounded hover:bg-black hover:text-white border border-black text-center transition-colors duration-200 block"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </form>
    </div>
  );
} 