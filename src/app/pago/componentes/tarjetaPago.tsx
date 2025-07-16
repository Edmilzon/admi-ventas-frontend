"use client";

import { useState } from "react";
import ImagenTarjeta from "@/app/dashboard/componentes/imagenTarjeta";

interface Props {
  nombre: string;
  imagen: string;
  precio: number;
}

export default function TarjetaPago({ nombre, imagen, precio }: Props) {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const cerrarTarjeta = () => {
    alert("Cerrar tarjeta (aquí iría tu lógica)");
  };

  return (
    <div className="w-full max-w-sm relative">

      <button
        onClick={cerrarTarjeta}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
      >
        ×
      </button>

      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow w-full mt-6">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-sm font-bold text-gray-900">{nombre}</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            {(precio * cantidad).toFixed(2)}{" "}
            <span className="text-sm font-normal">BOB</span>
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={disminuir}
              className="w-8 h-8 rounded bg-gray-300 text-lg font-bold hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-md font-semibold">{cantidad}</span>
            <button
              onClick={aumentar}
              className="w-8 h-8 rounded bg-gray-300 text-lg font-bold hover:bg-gray-400"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
          <ImagenTarjeta imagenUrl={imagen} />
        </div>
      </div>
    </div>
  );
}
