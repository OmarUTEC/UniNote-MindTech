import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    alert(`Buscando: ${searchTerm}`);
    // Aquí puedes agregar la lógica para realizar la búsqueda
  };

  return (
    <div className="flex items-center w-3/5  my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="flex-1 p-3 text-lg border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button
        onClick={handleSearch}
        className="p-3 text-lg bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
