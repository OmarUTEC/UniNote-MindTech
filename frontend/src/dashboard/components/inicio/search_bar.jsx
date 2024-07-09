import React, { useState } from 'react';

const SearchBar = ({ setDocument }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/search_document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
        body: new URLSearchParams({ key_words: searchTerm }),
        });

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      alert(`Buscando: ${searchTerm}`);
      setDocument(data.resultados);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center w-3/5 my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="flex-1 p-3 text-lg 
          border border-gray-300 
          rounded-l-md 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          text-black"
      />
      <button
        onClick={handleSearch}
        className={`p-3 text-lg 
          ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} 
          text-white 
          rounded-r-md 
          ${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-600'} 
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
        disabled={isLoading}
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
};

export default SearchBar;
