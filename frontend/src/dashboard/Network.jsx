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
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className='container'>
        <div className='custom-profile flex items-center justify-center'>
          <img src={profilePicture} alt="Profile" className='profile-image w-60 h-60 rounded-full object-cover border-4 border-black' />
          <div className='profile-details ml-8'>
            <div className='profile-info mb-4'>
              <h2>{profileName}</h2>
            </div>
            <div className='profile-info'>
              <h2>{email}</h2>
            </div>
            <div className='bg-red-500 w-full py-3 border-2 border-black rounded-lg'>
            <h2 className='text-white text-center'>ELIMINAR PERFIL</h2>

            </div>
          </div>
        </div>
        <div className='custom-buttons flex justify-between mt-8'>
        <button className='custom-button flex items-center justify-center w-1/3 p-6 border-2 border-black rounded-lg bg-blue-500'>
        <img src={followersIcon} alt="Followers" className='button-image w-20 h-20 mr-4' />
        <div>
          <h2 className='button-text'>FOLLOWERS</h2>
          <h2 className='button-text'>{numFollowers}</h2>
        </div>
      </button>

          <button className='custom-button flex items-center justify-center w-1/3 p-6 border-2 border-black rounded-lg bg-blue-500'>
            <img src={followingIcon} alt="Following" className='button-image w-20 h-20 mr-4' />
            <div>
              <h2 className='button-text'>FOLLOWING</h2>
              <h2 className='button-text'>{numFollowing}</h2>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Network;