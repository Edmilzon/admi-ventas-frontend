"use client";

import { useState } from "react";
import { MagnifyingGlassIcon} from "@heroicons/react/24/solid";

const vehiculos = [
  "Mercedez",
  "Chervrolet",
  "Apollo",
  "Audi",
  "Alpina",
  "Ferrari",
  "Bugatti",
  "Bitter",
  "BMW",
  "Brabus",
  "Mustang",
  "Muelle",
  "Muerdago",
  "Muerto",
  "Musico",
  "Muslo",
  "Mundial",
  "Musica",
  "Ford"
];

interface SearchBarProps {
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ name }) => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<string[]>([]);
  const [historial, setHistorial] = useState<string[]>([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length >= 1) {
      const filtrados = vehiculos.filter((vehiculo) =>
        vehiculo.toLowerCase().includes(valor.toLowerCase())
      );
      setResultados(filtrados);
      setMostrarHistorial(false);
    } else {
      setResultados([]);
      setMostrarHistorial(false);
    }
  };

  const handleFocus = () => {
    if (busqueda.length === 0) {
      setMostrarHistorial(true);
    }
  };

  const handleSelectItem = (item: string) => {
    setBusqueda(item);
    setResultados([]);
    setMostrarHistorial(false);
    setHistorial((prev) => (prev.includes(item) ? prev : [...prev, item]));
  };

  const handleDeleteItem = (item: string) => {
    setHistorial((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder={name}
        value={busqueda}
        onChange={handleBusqueda}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            setMostrarHistorial(false);
            setResultados([]);
          }, 150);
        }}
        className="p-2 border border-gray-300 rounded-md w-full h-12 text-left pr-12 text-[11px] md:text-base lg:text-lg "//focus:outline-none focus:ring-0 shadow-none
      />
      <button className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-md flex items-center justify-center">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;