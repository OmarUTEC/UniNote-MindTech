import React, { useState, useEffect } from 'react';
import useTheme from "../theme";

import profilePicture from '../assets/profilepicture.jpg';
import followersIcon from '../assets/followers.png';
import followingIcon from '../assets/following.png';

const Network = ({userId}) => {
  const { darkMode } = useTheme();
  const [userData, setData] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchDocuments();
  }, [userId]);

  const numFollowers = 43929;
  const numFollowing = 38;

  return (
    <div className={`w-full pt-24 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      
    <div className={`w-3/5 h-full bg-gray-100 rounded-3xl border-4 border-black flex flex-col gap-12 p-12`}>

      <div className='w-full h-3/4 flex flex-col lg:flex-row items-center justify-center p-6'>
        <div className="w-full lg:w-2/5 flex flex-col items-center justify-center">
          <img src={profilePicture} alt="Profile" className='profile-image w-60 h-60 rounded-full object-cover border-4 border-black' />
        </div>
        
        <div className='w-full lg:w-3/5 h-full flex flex-col gap-8 p-4 bg-white rounded-lg shadow-lg mt-6 lg:mt-0 lg:ml-6'>
          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
              <p className="text-lg font-semibold">Nombre</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full flex-grow px-4 py-2">
              <p className="text-lg">{userData.name} {userData.surname}</p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
              <p className="text-lg font-semibold">Carrera</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full flex-grow px-4 py-2">
              <p className="text-lg">{userData.career}</p>
            </div>
          </div>
          <div className='w-full flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
              <p className="text-lg font-semibold">Usuario</p>
            </div>
            <div className="w-2/5 bg-gray-200 text-black rounded-full px-4 py-2 mr-4">
              <p className="text-lg">{userData.username}</p>
            </div>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
              <p className="text-lg font-semibold">Ciclo</p>
            </div>
            <div className="w-1/6 bg-gray-200 text-black rounded-full flex items-center justify-center px-4 py-2">
              <p className="text-lg">{userData.cycle}</p>
            </div>
          </div>

          <div className='flex items-center'>
            <div className="w-1/5 bg-gray-700 text-white rounded-full flex items-center justify-center px-4 py-2 mr-4">
              <p className="text-lg font-semibold">Email</p>
            </div>
            <div className="bg-gray-200 text-black rounded-full w-4/5 px-4 py-2">
              <p className="text-lg">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>
        
      <div className='w-full h-1/4 flex flex-row justify-around'>  
        <button className='flex items-center justify-center w-1/3 p-6 border-4 border-black rounded-lg bg-blue-500'>
          <img src={followersIcon} alt="Followers" className='w-20 h-20 mr-6' />
          <div className="text-xl font-bold">
            <h2>FOLLOWERS</h2>
            <h2>{numFollowers}</h2>
          </div>
        </button>
        <button className='flex items-center justify-center w-1/3 p-6 border-4 border-black rounded-lg bg-blue-500'>
          <img src={followingIcon} alt="Following" className='w-20 h-20 mr-6' />
          <div className="text-xl font-bold">
          <p>FOLLOWING</p>
          <p>{numFollowing}</p>
          </div>
        </button>
      </div>

    </div>
    </div>
  );
};

export default Network;