import React from 'react';
import useTheme from "../theme";
import profilePicture from '../assets/profilepicture.jpg';
import followersIcon from '../assets/followers.png';
import followingIcon from '../assets/following.png';

const Network = () => {
  const { darkMode } = useTheme();
  const profileName = "Omar Echevarria";
  const email = "omar.eche@utec.edu.pe";
  const numFollowers = 43929;
  const numFollowing = 38;

  return (
    <div className={`w-full flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      
    <div className={`w-3/5 h-1/2 bg-white flex flex-col`}>

        <div className='w-full h-3/4 flex flex-row items-center justify-center bg-red-500'>
          <div className="w-2/5 h-full flex flex-col items-center justify-center bg-green-500">
            <img src={profilePicture} alt="Profile" className='profile-image w-60 h-60 rounded-full object-cover border-4 border-black' />
          </div>
          
          <div className='w-3/5 h-full flex flex-col gap-6 p-4'>
            <div> <p>{profileName}</p> </div>
            <div> <p>{email}</p> </div>
          </div>
        </div>

        
        <div className='w-full h-1/4 flex flex-row justify-around p-8'>  
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