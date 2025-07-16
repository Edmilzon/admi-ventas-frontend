"use client"
import React, { useState } from 'react';
import { registrarUsuario } from '@/services/usuariosService';

// Página de Registro de Usuario
export default function RegistroUsuario() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await registrarUsuario(form);
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setForm({ correo: '', nombre: '', contrasena: '', direccion: '', telf: '' });
    } catch (err: any) {
      let mensaje = 'Error al registrar. Verifica los datos e inténtalo de nuevo.';
      if (err?.response?.data?.message) {
        mensaje = err.response.data.message;
      } else if (err?.response?.data?.error) {
        mensaje = err.response.data.error;
      }
      setError(mensaje);
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
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-2 bg-black text-white font-bold rounded hover:bg-white hover:text-black border border-black transition-colors duration-200 disabled:opacity-60"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
} 