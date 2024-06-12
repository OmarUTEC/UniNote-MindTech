import React, { useState, useEffect } from 'react';
import download_file_button from '../icons/download_file_button.png';
import unlike from '../icons/unlike.jpg';
import liked from '../icons/like.jpg';
import unfavourite from '../icons/unfavourite.png';
import favourite from '../icons/favourite.png';


const Item = ({ title, userId, authorId, documentId, darkMode, preview }) => {
  const [markedFavourite, setFavourite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [likeOperation, setLikeOperation] = useState(false);
  const [like, setLike] = useState(null);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/likes/find/${userId}/${documentId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLike(data.answer);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchLike();
  }, [userId, documentId]);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const downloadFileUrl = `http://127.0.0.1:5000/download/${documentId}`;

    try {
      const response = await fetch(downloadFileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadFileUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('There was a problem with the download operation:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLikeClick = async () => {
    if (likeOperation) return;
    const dataLike = { 'usuario_id': userId, 'documento_id': documentId };  
    try {
      let response;
      if (like) {
        response = await fetch(`http://127.0.0.1:5000/like`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataLike),
        });
      } else {
        response = await fetch(`http://127.0.0.1:5000/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataLike),
        });
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setLike(prevLike => !prevLike);
    } catch (error) {
      console.error('There was a problem with the download operation:', error);
    } finally {
      setLikeOperation(false);
    }
  };
  

  const toggleFavourite = () => {
    setFavourite(prevFarourite => !prevFarourite);
  };
  
  return (
    <div className={`w-96 h-96
      flex flex-col items-center
      rounded-3xl border-2 border-black
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>
      
      <div className="w-full h-3/5">
        <img src={`data:image/jpeg;base64,${preview}`} alt="File" className="w-full h-full rounded-3xl"/>
      </div>
      
      <div className="w-full h-1/5 flex flex-col items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-gray-500">Autor: {authorId} - {like ? 'true' : 'false'}</p>
      </div>
      
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button onClick={handleDownloadClick} disabled={isDownloading} className="w-8 h-8" >
          <img src={download_file_button} alt="Download" />
        </button>
        <button onClick={handleLikeClick} disabled={likeOperation} className="w-8 h-8" >
          <img src={like ? liked : unlike} alt="Like" />
        </button>
        <button onClick={toggleFavourite} className="w-8 h-8" >
          <img src={markedFavourite ? favourite : unfavourite} alt="favoritos" />
        </button>
      </div>
    </div>
  );
};

export default Item;
