import React, { useState, useEffect, useRef } from 'react';

import pub from '../icons/pub.png';
import user from '../icons/user.png';
import download_file_button from '../icons/download_file_button.png';
import yes_like from '../icons/like.jpg';
import not_like from '../icons/unlike.jpg';
import yes_favourite from '../icons/favourite.png';
import not_favourite from '../icons/unfavourite.png';
import eye_icon from '../icons/ojo.png';
import loading_spinner from '../icons/loading_spinner.gif';
import close_icon from '../icons/close.png';

import yes_follow from '../icons/yes_follow.png';
import not_follow from '../icons/not_follow.png';


const FeedItem = ({ username, description, title, userId, careerId, authorId, documentId, darkMode, preview }) => {
    const [clicks, setClicks] = useState({ star: false, like: false, download: false });
    
    let like = true;

    const handleButtonClick = (type) => {
      setClicks((prevClicks) => ({
        ...prevClicks,
        [type]: !prevClicks[type],
      }));
    };
  
    return (
      <div className={`w-full h-96 bg-white border border-gray-300 rounded-lg overflow-hidden m-4 shadow-md`}>

        <div className={`w-full h-1/6 flex items-center pl-3 pr-3 border-b border-gray-300 bg-gray-300`}>
          <img src={user} alt="Avatar usuario" className={`w-12 h-12 mr-3 rounded-full`} />
          <span className={`font-bold text-xl`}>{username}</span>
        </div>
        
        <img src={`data:image/jpeg;base64,${preview}`} alt="Publicación" className={`w-full h-1/2`} />
        
        <div className={`w-full h-1/3`}>

            <div className="w-full h-1/3 flex flex-row items-center bg-gray-300">
                
                <p className={`w-2/3 font-bold text-base pr-3 pl-3`}>{title}</p> 

                <div className="w-1/3 h-full flex flex-row items-center justify-around pr-2 pl-2">
                    <button className="w-5 h-5">
                        <img src={not_follow} alt="follow"/>
                    </button>

                    <button onClick={() => handleButtonClick('star')} className="w-5 h-5">
                        <img src={yes_favourite} alt="favourite"/>
                    </button>

                    <button onClick={() => handleButtonClick('like')} className="w-5 h-5">
                        <img src={like ? yes_like : not_like} alt="like" />
                    </button>

                    <button onClick={() => handleButtonClick('download')} className="w-5 h-5">
                        <img src={download_file_button} alt="download" />
                    </button>        
                </div>
            </div>

            
            <div className={`w-full h-2/3 text-sm text-gray-800 bg-white pt-3 pb-3 pr-3 pl-3`}>
                {description}
            </div>
        </div>
      </div>
    );
  };

  export default FeedItem;