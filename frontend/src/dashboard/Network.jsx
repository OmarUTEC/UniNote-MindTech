import React from 'react';
import useTheme from "../theme";
import './Network.css';

import profilepicture from '../assets/profilepicture.jpg';
import followers from '../assets/followers.png';
import following from '../assets/following.png';

const Network = () => {
  const { darkMode } = useTheme();
  const profileName = "Omar Echevarria"
  const e_mail = "omar.eche@utec.edu.pe";
  const numFollowers = 43929;
  const numFollowing = 38;
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      
      <div className='container'>
        <div className={`custom-profile`}>
          <img src={profilepicture} alt="Upload File" className={`profile-image`} />
          <div className="profile-details">
            <div className="profile-info"> <h2>{profileName}</h2> </div>
            <div className="profile-info"> <h2>{e_mail}</h2> </div>
            <button className='drop-profile-button'>ELIMINAR PERFIL</button>
          </div>
        </div>

        <div className={`custom-profile`}>
          <button className={`custom-button ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <img src={followers} alt="Upload File" className={`button-image`} />
            <div>
            <h2 className={`button-text ${darkMode ? 'text-white' : 'text-black'}`}>FOLLOWERS</h2>
            <h2 className={`button-text ${darkMode ? 'text-white' : 'text-black'}`}>{numFollowers}</h2>
            </div>
          </button> 
        
          <button className={`custom-button ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <img src={following} alt="Upload File" className={`button-image`} />
            <div>
            <h2 className={`button-text ${darkMode ? 'text-white' : 'text-black'}`}>FOLLOWING</h2>
            <h2 className={`button-text ${darkMode ? 'text-white' : 'text-black'}`}>{numFollowing}</h2>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Network;