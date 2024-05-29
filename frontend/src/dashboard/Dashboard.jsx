import React, { useState } from 'react';
import Biblioteca from './Biblioteca';
import Carreras from './Carreras';
import Inicio from './Inicio';
import Network from './Network';
import Upload from './Upload';
import UploadFile from './UploadFile';

function App() {
  const [activeTab, setActiveTab] = useState('inicio');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className="bg-blue-500 text-white py-2 px-4 flex justify-between items-center">
        <div className="text-xl font-bold"> UniNote </div>
        <div>
          <button className="mx-2"> <i className="fas fa-bell"> </i> </button>
          <button className="mx-2"> <i className="fas fa-cog"> </i> </button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-56 bg-gray-200 p-4">
          
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'inicio' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('inicio')}
          > INICIO </button>
          
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'biblioteca' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('biblioteca')}
          > BIBLIOTECA </button>
          
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'carreras' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('carreras')}
          > CARRERAS </button>
          
          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'network' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('network')}
          > PERFIL </button>

          <button
            className={`block py-2 px-4 mb-2 rounded ${
              activeTab === 'upload' || activeTab === 'upload-file' ? 'bg-gray-400' : 'bg-gray-300'
            }`}
            onClick={() => handleTabClick('upload')}
          > SUBIR </button>
        
        </div>
        
        <div className="flex-1 p-4">
          {activeTab === 'inicio' && <Inicio />}
          {activeTab === 'biblioteca' && <Biblioteca />}
          {activeTab === 'carreras' && <Carreras />}
          {activeTab === 'network' && <Network />}
          {activeTab === 'upload' && <Upload handleUploadFileClick={() => handleTabClick('upload-file')}/>}
          {activeTab === 'upload-file' && <UploadFile handleUploadClick={() => handleTabClick('upload')}/>}
        </div>

      </div>
    </div>
  );
}

export default App;