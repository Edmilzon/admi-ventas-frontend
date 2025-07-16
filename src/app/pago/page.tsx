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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Total: </h1>
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
    </div>
  );
}
