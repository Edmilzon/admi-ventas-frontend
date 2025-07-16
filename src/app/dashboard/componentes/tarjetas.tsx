import ImagenTarjeta from "./imagenTarjeta";

interface Props {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  onAgregar?: () => void;
}

export default function Tarjeta({ nombre, descripcion, imagen, precio, onAgregar }: Props) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow w-full">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-sm font-bold text-gray-900">{nombre}</h1>
          <span className="text-xs text-gray-600 italic">{descripcion}</span>
          <h2 className="text-2xl font-bold text-gray-900">
            {precio.toFixed(2)} <span className="text-sm font-normal">BOB</span>
          </h2>

          {/* Botones */}
          <div className="flex gap-1 bg-black rounded-lg p-1 w-fit mt-2">
            <button
              className="text-white px-3 py-1 text-sm rounded-md"
              onClick={onAgregar}
            >
              Añadir
            </button>
            <button
              onClick={onAgregar} 
              className="bg-white text-black w-8 h-8 rounded-md border border-black flex items-center justify-center"
              aria-label="Agregar al carrito"
            >
              🛒
            </button>
          </div>
        </div>

        <div className="w-24 h-24 ml-2 rounded-lg bg-gray-400 flex-shrink-0 overflow-hidden">
          <ImagenTarjeta imagenUrl={imagen + ""} />
        </div>
      </div>
    </div>
  );
}
