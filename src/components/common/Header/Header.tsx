"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  placeholder: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder, 
  onSearch,
  className = "" 
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (onSearch) {
      onSearch(value);
    }

    // Aquí se puede implementar la búsqueda real de productos
    if (value.length >= 1) {
      // Placeholder para búsqueda de productos
      const mockResults = ["Producto 1", "Producto 2", "Producto 3"].filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className={`w-60 bg-white max-w-sm rounded-md ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={handleSearch}
          onBlur={() => setTimeout(() => setResults([]), 150)}
          className="p-3 border border-gray-300 rounded-md w-full h-12 text-sm pr-12"
        />
        <button className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-md flex items-center justify-center">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {results.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-md shadow-md bg-white text-sm max-h-40 overflow-y-auto">
          {results.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
