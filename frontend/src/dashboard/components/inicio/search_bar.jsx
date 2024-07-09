import React, { useState } from 'react';
import { FaSearch, FaList } from 'react-icons/fa';

const SearchBar = ({ setDocument }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      try {
        const response = await fetch(`http://34.239.210.249:5000/suggestions?query=${value}`);
        if (!response.ok) {
          throw new Error('Error fetching suggestions');
        }
        const data = await response.json();
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://34.239.210.249:5000/search_document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ key_words: query || searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      setDocument(data.resultados);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setIsLoading(false);
      setSuggestions([]);
    }
  };

  const handleViewAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://34.239.210.249:5000/search/documents');
      if (!response.ok) {
        throw new Error('Error al recuperar todos los documentos');
      }
      const data = await response.json();
      setDocument(data); 
    } catch (error) {
      console.error('Error al recuperar todos los documentos:', error);
    } finally {
      setIsLoading(false);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar documentos..."
          className="w-full p-4 pr-12 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out dark:bg-gray-700 dark:text-black"
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          disabled={isLoading}
        >
          <FaSearch className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-10 dark:bg-gray-700 dark:border-gray-600">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out dark:text-black dark:hover:bg-gray-600"
                onClick={() => {
                  setSearchTerm(suggestion);
                  handleSearch(suggestion);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleViewAll}
          className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-black border border-#819FF7 rounded-full bg-transparent 
                      hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-black 
                      transition duration-300 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <FaList className="mr-2" />
          {isLoading ? 'Cargando...' : 'Ver todos los documentos'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
