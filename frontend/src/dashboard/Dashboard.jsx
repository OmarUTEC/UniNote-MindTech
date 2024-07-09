import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaGraduationCap, FaUser, FaUpload } from 'react-icons/fa';
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
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [uploadsCount, setUploadsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserName(`${data.name} ${data.surname}`);
        setUploadsCount(data.uploads_count || 3);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchFollowersCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/followers_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowersCount(data.count);
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    const fetchFollowingCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/following_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFollowingCount(data.count);
      } catch (error) {
        console.error('Error fetching following count:', error);
      }
    };

    fetchUserData();
    fetchFollowersCount();
    fetchFollowingCount();
  }, [userId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
      <div className="flex flex-1 mt-16">
        <div className={`${theme.navColor} w-56 p-4 fixed h-full mt-2 rounded-lg`}>
          <div className="text-center mb-4">
            <div className="bg-blue-500 rounded-full w-24 h-24 mx-auto mb-2"></div>
            <div className="text-xl font-semibold">{userName}</div>
            <div className="text-sm">{followingCount} Amigos | {uploadsCount} Subidos</div>
          </div>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'inicio' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('inicio')}
          > <FaHome className="mr-2" /> INICIO
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'library' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('library')}
          > <FaBook className="mr-2" /> BIBLIOTECA
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'career' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('career')}
          > <FaGraduationCap className="mr-2" /> CARRERAS
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'network' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('network')}
          > <FaUser className="mr-2" /> PERFIL
          </button>
  
          <button
            className={`w-full flex items-center py-2 px-4 mb-2 rounded ${activeTab === 'upload' ? 'bg-blue-200' : ''} ${theme.buttonTextColor} focus:outline-none`}
            onClick={() => handleTabClick('upload')}
          > <FaUpload className="mr-2" /> APORTES
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
