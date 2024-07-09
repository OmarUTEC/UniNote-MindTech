import React, { useState, useEffect } from 'react';
import useTheme from "../theme";

import profilePicture from '../assets/profilepicture.jpg';
import followersIcon from '../assets/followers.png';
import followingIcon from '../assets/following.png';

const Network = ({ userId, handleClick }) => {
  const { darkMode } = useTheme();
  const [userData, setData] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`http://34.239.210.249:5000/usuarios/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const userData = await userResponse.json();
        setData(userData);

        const followersResponse = await fetch(`http://34.239.210.249:5000/followers_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const followersData = await followersResponse.json();
        setFollowersCount(followersData.count);

        const followingResponse = await fetch(`http://34.239.210.249:5000/following_count/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const followingData = await followingResponse.json();
        setFollowingCount(followingData.count);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className={`w-full pt-24 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className={`w-3/5 h-full bg-gray-100 rounded-3xl border-4 border-black flex flex-col gap-12 pt-8 pb-8 pr-4 pl-4`}>
        <div className='w-full h-3/4 flex flex-col lg:flex-row items-center justify-center p-6'>
          <div className="w-full lg:w-2/5 flex flex-col items-center justify-center">
            <img src={profilePicture} alt="Profile" className='profile-image w-60 h-60 rounded-full object-cover border-4 border-black' />
            <button onClick={() => handleClick('updateProfile')} className="bg-yellow-500"> <p>ACTUALIZAR PERFIL</p> </button>
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
          <button onClick={() => handleClick('followers')} className='flex items-center justify-center w-1/3 p-6 border-4 border-black rounded-lg bg-blue-500'>
            <img src={followersIcon} alt="Followers" className='w-20 h-20 mr-6' />
            <div className="text-xl font-bold">
              <h2>FOLLOWERS</h2>
              <h2>{followersCount}</h2>
            </div>
          </button>

          <button className='flex items-center justify-center w-1/5 p-6 border-4 border-black rounded-lg bg-blue-500'>
            <div className="text-xl font-bold">
              <p>ID: {userId}</p>
            </div>
          </button>

          <button onClick={() => handleClick('following')} className='flex items-center justify-center w-1/3 p-6 border-4 border-black rounded-lg bg-blue-500'>
            <img src={followingIcon} alt="Following" className='w-20 h-20 mr-6' />
            <div className="text-xl font-bold">
              <p>FOLLOWING</p>
              <p>{followingCount}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Network;