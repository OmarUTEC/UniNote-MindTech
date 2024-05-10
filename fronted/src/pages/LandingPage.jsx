import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../theme"; 
import { darkTheme, lightTheme } from "../theme"; 

import logo from '../assets/logo.png';
import userstudent from '../assets/userstudent.jpeg';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme(); 
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <div className={`min-h-screen ${theme.backgroundColor}`}>
      <header className={`${theme.navColor} ${theme.navShadow}`}>
        <div className="container mx-auto py-4 px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="UniNote" className="h-12" />
            <span className={`ml-2 text-2xl font-bold ${theme.navTextColor}`}>UniNote</span>
          </div>

          <nav>
            <Link to="/" className={`ml-2 mr-4 text-2xl font-bold ${theme.navTextColor}`}>Inicio</Link>
            <Link to="/metas" className={`ml-2 mr-4 text-2xl font-bold ${theme.navTextColor}`}>Metas</Link>
            <Link to="/login" className={`ml-2 text-2xl font-bold ${theme.navTextColor}`}>Iniciar sesión</Link>
          </nav>
        </div>
      </header>

      <button onClick={toggleDarkMode} className="fixed top-4 right-4 z-10 bg-white text-black px-4 py-2 rounded-md shadow-md">
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <main className="container mx-auto py-8 px-8 flex items-center">
        <div className="w-1/2 pr-4">
          <h1 className={`text-5xl font-bold mb-4 ${theme.textColor}`}>COMPARTIR PARA APRENDER</h1>
          <h2 className={`text-3xl font-semibold mb-2 ${theme.textColor}`}>Te ofrecemos publicar y descubrir papers y apuntes de guía académica</h2>
          <p className={`text-3xl mb-4 ${theme.textColor}`}>Una plataforma dirigida a los estudiantes que quieren aprender y compartir sus aprendizajes</p>
        </div>
        <div className="w-1/2 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cach-l2 to-transparent "></div>
          <img src={userstudent} alt="Usuario estudiante" className="rounded-lg shadow-md" />
        </div>
      </main>

    </div>
  );
};

export default LandingPage;
