"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const vehiculos = ["Mercedez", "Audi", "BMW", "Ford", "Ferrari", "Musica"];

interface SearchBarProps {
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ name }) => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<string[]>([]);

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length >= 1) {
      const filtrados = vehiculos.filter((v) =>
        v.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
    } else {
      setResultados([]);
    }
  };

  return (
    <div className="block md:hidden w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          placeholder={name}
          value={busqueda}
          onChange={handleBusqueda}
          onBlur={() => setTimeout(() => setResultados([]), 150)}
          className="p-3 border border-gray-300 rounded-md w-full h-12 text-sm pr-12"
        />
        <button className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-md flex items-center justify-center">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {resultados.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-md shadow-md bg-white text-sm max-h-40 overflow-y-auto">
          {resultados.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
