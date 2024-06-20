import React, { useState, useEffect } from 'react';
import download_file_button from '../icons/download_file_button.png';

import yes_like from '../icons/like.jpg';
import not_like from '../icons/unlike.jpg';

const Item = ({ title, userId, careerId, authorId, documentId, darkMode, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [like, setLike] = useState(null);
  const [likeOperation, setLikeOperation] = useState(false);

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
      } catch (error) {
        console.error(`There was a problem with the fetch operation for ${endpoint}:`, error);
      }
    };
    fetchData('likes/find', setLike);
  }, [userId, documentId]);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const downloadFileUrl = `http://127.0.0.1:5000/download/${documentId}`;
    try {
      const response = await fetch(downloadFileUrl);
      if (!response.ok) throw new Error('Network response was not ok');
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
    <div className={`w-96 h-96 flex flex-col items-center rounded-3xl border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>
      <div className="w-full h-3/5">
        <img src={`data:image/jpeg;base64,${preview}`} alt="File" className="w-full h-full rounded-3xl" />
      </div>
      <div className="w-full h-1/5 flex flex-col items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-gray-500">Autor: {authorId} - Carrera: {careerId}</p>
      </div>
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button onClick={handleDownloadClick} disabled={isDownloading} className="w-8 h-8">
          <img src={download_file_button} alt="Download" />
        </button>
        <button
          onClick={() => handleOperationClick('like', setLike, like, setLikeOperation, likeOperation)}
          disabled={likeOperation}
          className="w-8 h-8"
        > <img src={like ? yes_like : not_like} alt="Like" />
        </button>
      </div>
    </div>
  );
};

export default Item;
