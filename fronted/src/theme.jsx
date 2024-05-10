import React, { useState, useEffect } from 'react';

const useTheme = () => {
  // Estado para controlar el tema (claro u oscuro)
  const [darkMode, setDarkMode] = useState(() => {
    // Leer el tema seleccionado de localStorage al cargar la página
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Función para alternar entre el modo claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Almacenar el tema seleccionado en localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};

export default useTheme;

// theme.js

const lightTheme = {
    backgroundColor: 'bg-cach-l2',
    textColor: 'text-black',
    navColor: 'bg-cach-l1',
    navTextColor: 'text-cach-l2'
  };
  
  const darkTheme = {
    backgroundColor: 'bg-gray-900',
    textColor: 'text-white',
    navColor: 'bg-gray-800',
    navTextColor: 'text-white'
  };
  
  export { lightTheme, darkTheme };
  