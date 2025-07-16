"use client";
import { useCarritoStore } from "../stores/useCarritoStore";
import SearchBar from "./componentes/navBar";
import Tarjeta from "./componentes/tarjetas";
import { useProductos } from "./hooks/useProductos";

export default function Dashboard() {
  const { productos, loading, error } = useProductos();
  const { agregar } = useCarritoStore();
  
  return (
    <div className="w-full min-h-screen bg-white px-4 py-6 flex flex-col items-center gap-4">
      
      <div className="w-96 h-40 bg-amber-500 rounded-bl-[50px] rounded-br-[50px] flex items-center justify-center">
        <SearchBar name={"Buscar Mermelada"} />
      </div>

      {loading && <p className="text-gray-500">Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading &&
        !error &&
        productos.map((producto) => (
          <Tarjeta
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            imagen={producto.imagen}
            precio={parseFloat(producto.precio)}
            onAgregar={() =>
              agregar({
                id: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: parseFloat(producto.precio),
                cantidad: 1,
              })
            }
          />
        ))}
    </div>
  );
}
