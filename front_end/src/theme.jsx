import { useState, useEffect } from 'react';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};

export default useTheme;

const lightTheme = {
  backgroundColor: 'bg-cach-l2',
  textColor: 'text-black',
  navColor: 'bg-cach-l1',
  navTextColor: 'text-cach-l2',
  buttonColor: 'hover:bg-gray-200'
};

const darkTheme = {
  backgroundColor: 'bg-gray-900',
  textColor: 'text-white',
  navColor: 'bg-gray-800',
  navTextColor: 'text-white',
  buttonColor: 'hover:bg-gray-700'
};

export { lightTheme, darkTheme };
