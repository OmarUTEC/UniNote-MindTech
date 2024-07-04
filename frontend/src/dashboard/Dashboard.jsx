import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Library from './Library';
import Bookshelf from './Bookshelf';
import Carreras from './Carreras';
import Inicio from './Inicio';
import Network from './Network';
import UpdateUserData from '../dashboard/components/network/form';
import Upload from './Upload';
import UploadFile from './components/upload/form';
import Followers from './components/network/followers';
import Following from './components/network/following';
import logo from '../assets/logo.png';
import useTheme, { lightTheme, darkTheme } from '../theme.jsx';

function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  const location = useLocation();
  const { userId = 0 } = location.state || {};
  const [careerId, setCareerId] = useState(0);
  const [activeTab, setActiveTab] = useState('inicio');
  const [userName, setUserName] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://34.239.210.249:5000/usuarios/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserName(`${data.name} ${data.surname}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchUserName();
  }, [userId]);

  return (
    <div className={`flex flex-col h-screen ${theme.backgroundColor} ${theme.textColor}`}>
      <div className={`${theme.navColor} py-2 px-2 flex justify-between items-center fixed w-full z-10`}>
        <div className="flex items-center text-xl font-bold">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
            UniNote
          </Link>
        </div>
        <div>
          <button onClick={toggleDarkMode} className="mx-2 text-white hover:text-gray-300 focus:outline-none">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button className="mx-2 text-white hover:text-gray-300 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-1 mt-16"> {/* Agrega un margen superior para evitar que el contenido quede detrás del header fijo */}
        <div className={`${theme.navColor} w-56 p-4 fixed h-full mt-2 rounded-lg`}> {/* Class fixed para sidebar quede estatico */}
          <div className="text-center mb-4">
            <div className="bg-blue-500 rounded-full w-24 h-24 mx-auto mb-2"></div>
            <div className="text-xl font-semibold">{userName}</div>
            <div className="text-sm">4 Amigos | 8 Subidos</div>
          </div>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'inicio' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('inicio')}
          > <i className="fas fa-home mr-2"></i>INICIO
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'library' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('library')}
          > <i className="fas fa-book mr-2"></i>BIBLIOTECA
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'career' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('career')}
          > <i className="fas fa-graduation-cap mr-2"></i>CARRERAS
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'network' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('network')}
          > <i className="fas fa-user mr-2"></i>PERFIL
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'upload' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('upload')}
          > <i className="fas fa-upload mr-2"></i>SUBIR
          </button>
  

        </div>
  
        <div className={`flex-1 pt-2 pl-6 pr-6 ml-56 ${theme.backgroundColor}`}>
          <div className="w-full h-full max-w-full max-h">
            {activeTab === 'inicio' && <Inicio userId={userId} />}
            {activeTab === 'library' && <Bookshelf userId={userId} />}
            {activeTab === 'career' && <Carreras userId={userId} setCareerId={setCareerId} handleClick={() => handleTabClick('career/library')}/>}
            {activeTab === 'career/library' && <Library filters={{ userId: userId, careerId: careerId }} />}
            {activeTab === 'network' && <Network userId={userId} handleClick={handleTabClick} />}
            {activeTab === 'updateProfile' && <UpdateUserData userId={userId} handleClick={() => handleTabClick('network')}/>}
            {activeTab === 'upload' && <Upload userId={userId} handleUploadFileClick={() => handleTabClick('uploadFile')}/>}
            {activeTab === 'uploadFile' && <UploadFile userId={userId} handleUploadClick={() => handleTabClick('upload')}/>}
            {activeTab === 'followers' && <Followers userId={userId} />}
            {activeTab === 'following' && <Following userId={userId} />}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Dashboard;
