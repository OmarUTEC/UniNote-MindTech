import React from "react";
import { Link } from "react-router-dom";

import logo from '../assets/logo.jpeg';
import userstudent from '../assets/userstudent.jpeg';

const LandingPage = () => {
  return (
    <div className="bg-cach-l2 min-h-screen">
      <header className="bg-cach-l1 shadow">
        <div className="container mx-auto py-4 px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="UniNote" className="h-12" />
            <span className="ml-2 text-2xl font-bold text-cach-l2">UniNote</span>
          </div>

          <nav>
            <Link to="/" className="ml-2 mr-4 text-2xl font-bold text-cach-l2">Inicio</Link>
            <Link to="/metas" className="ml-2 mr-4 text-2xl font-bold text-cach-l2">Metas</Link>
            <Link to="/login" className="ml-2 text-2xl font-bold text-cach-l2">Iniciar sesión</Link>
          </nav>
        </div>
      </header>


      <main className="container mx-auto py-8 px-8 flex items-center">
        <div className="w-1/2 pr-4">
          <h1 className="text-5xl font-bold mb-4 text-cach-l1">"COMPARTIR PARA APRENDER"</h1>
          <h2 className="text-3xl font-semibold mb-2 text-cach-l1">Te ofrecemos publicar y descubrir papers y apuntes de guía académica</h2>
          <p className="text-3xl text-cach-l5 mb-4 text-cach-l1">Una plataforma dirigida a los estudiantes que quieren aprender y compartir sus aprendizajes</p>
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
