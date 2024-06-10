import React, { useState } from 'react';

import download_file_button from '../icons/download_file_button.png';
import edit_file_button from '../icons/edit_file_button.png';
import drop_file_button from '../icons/drop_file_button.png';

const Item = ({ title, idDocument, darkMode, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const downloadFileUrl = `http://127.0.0.1:5000/download/${idDocument}`;

    try {
      const response = await fetch(downloadFileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Crear un enlace y simular un clic para iniciar la descarga
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadFileUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('There was a problem with the download operation:', error);
    } finally {
      setIsDownloading(false); // Reiniciar el estado después de la descarga
    }
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
      
      <div className="w-full h-1/5 flex items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
      </div>
      
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className="w-8 h-8" >
        <img src={download_file_button} alt="Download"/>
        </button>
        <button className="w-8 h-8"><img src={edit_file_button} alt="Edit"/></button>
        <button className="w-8 h-8"><img src={drop_file_button} alt="Delete"/></button>
      </div>
    
    </div>
  );
};

export default Item;
