"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

const API_URL = "https://admi-ventas-backend.onrender.com/productos";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dl4qmorch/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ximena";

interface ProductoAdmin {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  stock: number;
}

export default function AdminProductosPage() {
  const { isAdmin, isAuthenticated } = useAuth();
  const router = useRouter();
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace("/login");
    }
  }, [isAuthenticated, isAdmin, router]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, imagen: data.secure_url }));
        setImagePreview(data.secure_url);
      } else {
        setError("No se pudo subir la imagen");
      }
    } catch {
      setError("No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          imagen: form.imagen || undefined,
          stock: parseInt(form.stock, 10)
        })
      });
      if (!res.ok) throw new Error("No se pudo agregar el producto");
      setSuccess("Producto agregado correctamente");
      setForm({ nombre: "", descripcion: "", precio: "", imagen: "", stock: "" });
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchProductos();
    } catch {
      setError("No se pudo agregar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('No se pudo eliminar el producto');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-amber-700">Gestión de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-xl font-bold mb-4 text-amber-700">Añadir nuevo producto</h3>
          <form className="bg-white rounded-lg shadow p-6 grid gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Descripción</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">Precio</label>
                <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Imagen</label>
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-0 cursor-pointer transition hover:border-amber-500 bg-amber-50 aspect-square w-full max-w-xs mx-auto ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
                style={{ minHeight: '220px', minWidth: '220px', maxWidth: '320px' }}
                onClick={handleImageClick}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  disabled={uploading}
                />
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={220}
                      height={220}
                      className="w-full h-full object-contain rounded border shadow aspect-square"
                      style={{ minHeight: '200px', minWidth: '200px', maxHeight: '300px', maxWidth: '300px' }}
                    />
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className="px-3 py-1 bg-amber-700 text-white rounded font-bold hover:bg-amber-800 transition text-sm mt-2"
                      disabled={uploading}
                    >
                      Cambiar imagen
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 justify-center w-full h-full min-h-[200px] min-w-[200px] aspect-square">
                    <PhotoIcon className="w-14 h-14 text-amber-400" />
                    <span className="text-gray-500 font-semibold">Haz clic o arrastra una imagen aquí</span>
                    {uploading && <span className="text-amber-700 font-bold mt-2">Subiendo imagen...</span>}
                  </div>
                )}
              </div>
            </div>
            {error && <div className="text-red-600 font-bold">{error}</div>}
            {success && <div className="text-green-700 font-bold">{success}</div>}
            <button type="submit" className="bg-amber-700 text-white px-6 py-2 rounded font-bold hover:bg-amber-800 transition" disabled={submitting || uploading}>
              {submitting ? "Agregando..." : "Agregar Producto"}
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-amber-700">Lista de productos</h3>
          {loading ? (
            <div>Cargando productos...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {productos.map((prod) => (
                <div key={prod.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center gap-4">
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded aspect-square overflow-hidden">
                    {prod.imagen ? (
                      <Image src={prod.imagen} alt={prod.nombre} width={96} height={96} className="object-contain w-full h-full" />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="font-bold text-lg text-amber-800">{prod.nombre}</div>
                    <div className="text-gray-600 mb-1">{prod.descripcion}</div>
                    <div className="text-gray-700">Precio: <span className="font-semibold">S/ {prod.precio}</span></div>
                    <div className="text-gray-700">Stock: <span className="font-semibold">{prod.stock}</span></div>
                    <div className="flex gap-3 justify-center mt-4">
                      <button
                        className="px-4 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700 transition text-sm"
                        title="Editar producto"
                        disabled
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="px-4 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition text-sm"
                        title="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 