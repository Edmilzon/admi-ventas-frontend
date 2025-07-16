"use client"
import { useCarritoStore } from "../stores/useCarritoStore";
import TarjetaPago from "./componentes/tarjetaPago";

export default function Pagar() {
  const { productos } = useCarritoStore();

  const total = productos.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  return (
    <div className="p-4 grid grid-row">
      <h1 className="text-xl font-extrabold mb-4">Total: </h1>
      <span className="text-4xl font-medium">{total.toFixed(2)} BOB</span>
      {productos.map((p) => (
        <TarjetaPago
          key={p.id}
          id={p.id}
          nombre={p.nombre}
          imagen={p.imagen}
          precio={p.precio}
        />
      ))}
      <button className="w-full max-w-sm bg-black text-white py-3 rounded-lg text-lg font-semibold mt-4">
        Pagar
      </button>
    </div>
  );
}
