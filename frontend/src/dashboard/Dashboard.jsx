import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Biblioteca from './Biblioteca';
import Carreras from './Carreras';
import Inicio from './Inicio';
import Network from './Network';
import Upload from './Upload';
import UploadFile from './UploadFile';
import logo from '../assets/logo.png';
import useTheme, { lightTheme, darkTheme } from '../theme.jsx';

function App() {
  const location = useLocation();
  const { userId = 0 } = location.state;
  const { darkMode, toggleDarkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;
  const [activeTab, setActiveTab] = useState('inicio');

  const handleTabClick = (tab) => { setActiveTab(tab); };

  return (
    <div className={`flex flex-col h-screen ${theme.backgroundColor} ${theme.textColor}`}>
      <div className={`${theme.navColor} ${theme.navTextColor} py-2 px-2 flex justify-between items-center`}> 
        <div className="flex items-center text-xl font-bold">
          <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
          UniNote
        </div>
        <div>
          <button onClick={toggleDarkMode} className="mx-2 text-white hover:text-gray-300 focus:outline-none">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button className="mx-2 text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
          <button className="mx-2 text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <div className={`${theme.navColor} w-56 p-4 mt-2 rounded-lg`}>
          <button
            className={`w-full block py-2 px-4 mb-2 rounded border ${activeTab === 'inicio' ? 'border-gray-400' : 'border-gray-300'} ${theme.buttonColor} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('inicio')}
          >INICIO</button>
          <button
            className={`w-full block py-2 px-4 mb-2 rounded border ${activeTab === 'biblioteca' ? 'border-gray-400' : 'border-gray-300'} ${theme.buttonColor} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('biblioteca')}
          >BIBLIOTECA</button>
          <button
            className={`w-full block py-2 px-4 mb-2 rounded border ${activeTab === 'carreras' ? 'border-gray-400' : 'border-gray-300'} ${theme.buttonColor} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('carreras')}
          >CARRERAS</button>
          <button
            className={`w-full block py-2 px-4 mb-2 rounded border ${activeTab === 'network' ? 'border-gray-400' : 'border-gray-300'} ${theme.buttonColor} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('network')}
          >PERFIL</button>
          <button
            className={`w-full block py-2 px-4 mb-2 rounded border ${activeTab === 'upload' || activeTab === 'upload-file' ? 'border-gray-400' : 'border-gray-300'} ${theme.buttonColor} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('upload')}
          >SUBIR</button>
        </div>
        <div className="flex-1 pt-2 pl-6 pr-6">
          <div className="w-full h-full max-w-full max-h-full">
            {activeTab === 'inicio' && <Inicio />}
            {activeTab === 'biblioteca' && <Biblioteca />}
            {activeTab === 'carreras' && <Carreras />}
            {activeTab === 'network' && <Network />}
            {activeTab === 'upload' && <Upload userId={userId} handleUploadFileClick={() => handleTabClick('upload-file')} />}
            {activeTab === 'upload-file' && <UploadFile userId={userId} handleUploadClick={() => handleTabClick('upload')} />}
          </div>
        </div>    
      </div>
    </div>
  );
}

export default App;
