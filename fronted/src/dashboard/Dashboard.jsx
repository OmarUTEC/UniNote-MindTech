import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
        <div className="text-xl font-bold">UniNote</div>
        <div>
          <button className="mx-2">
            <i className="fas fa-bell"></i>
          </button>
          <button className="mx-2">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-56 bg-gray-200 p-4">
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'inicio' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('inicio')}
          >
            INICIO
          </button>
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'biblioteca' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('biblioteca')}
          >
            BIBLIOTECA
          </button>
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'carreras' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('carreras')}
          >
            CARRERAS
          </button>
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'network' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('network')}
          >
            NETWORK
          </button>
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'subir' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('subir')}
          >
            SUBIR
          </button>
        </div>
        <div className="flex-1 p-4">
          {activeTab === 'inicio' && <Inicio />}
          {activeTab === 'biblioteca' && <Biblioteca />}
          {activeTab === 'carreras' && <Carreras />}
          {activeTab === 'network' && <Network />}
          {activeTab === 'subir' && <Subir />}
        </div>
      </div>
    </div>
  );
}

function Inicio() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Inicio</h2>
      <p>Bienvenido a la página de inicio.</p>
    </div>
  );
}

function Biblioteca() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Biblioteca</h2>
      <p>Aquí puedes explorar nuestra biblioteca de recursos.</p>
    </div>
  );
}

function Carreras() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Carreras</h2>
      <p>Información sobre las carreras disponibles.</p>
    </div>
  );
}

function Network() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Network</h2>
      <p>Únete a nuestra red de estudiantes y profesionales.</p>
    </div>
  );
}

function Subir() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Subir</h2>
      <p>Sube tus archivos y recursos aquí.</p>
    </div>
  );
}

export default App;