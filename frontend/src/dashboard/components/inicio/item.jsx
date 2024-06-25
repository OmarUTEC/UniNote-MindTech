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
  const [isDownloading, setIsDownloading] = useState(false);
  const [like, setLike] = useState(null);
  const [likeOperation, setLikeOperation] = useState(false);
  const [favourite, setFavourite] = useState(null);
  const [favouriteOperation, setFavouriteOperation] = useState(false);
  const [follow, setFollow] = useState(null);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}/${userId}/${documentId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setter(data.answer);
      } catch (error)
      { console.error(`There was a problem with the fetch operation for ${endpoint}:`, error); }
    };
    fetchData('likes/find', setLike);
    fetchData('favourite/find', setFavourite);
  }, [userId, documentId]);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const downloadFileUrl = `http://127.0.0.1:5000/download/${documentId}`;
      const response = await fetch(downloadFileUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);  
    } catch (error) {
      console.error('There was a problem with the download operation:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOperationClick = async (type, setter, value, setterOperation, operationValue) => {
    if (operationValue) return;
    setterOperation(true);
    const data = { 'usuario_id': userId, 'documento_id': documentId };
    try {
      const response = await fetch(`http://127.0.0.1:5000/${type}`, {
        method: value ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setter(!value);
    } catch (error) {
      console.error(`There was a problem with the ${type} operation:`, error);
    } finally {
      setterOperation(false);
    }
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

                    <button onClick={() => handleOperationClick('like', setLike, like, setLikeOperation, likeOperation)} disabled={likeOperation} className="w-6 h-6">
                      <img src={like ? yes_like : not_like} alt="Like" />
                    </button>

                    <button onClick={() => handleOperationClick('favourite', setFavourite, favourite, setFavouriteOperation, favouriteOperation)} disabled={favouriteOperation} className="w-6 h-6">
                      <img src={favourite ? yes_favourite : not_favourite} alt="Favourite" />
                    </button>

                    <button onClick={handleDownloadClick} disabled={isDownloading} className="w-6 h-6">
                      {isDownloading ? (
                        <img src={loading_spinner} alt="Downloading..." />
                      ) : (<img src={download_file_button} alt="Download" />)}
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