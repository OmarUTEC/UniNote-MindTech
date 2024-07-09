import React, { useState } from 'react';
import download_file_button from '../assets/download_file_button.png';
import edit_file_button from '../assets/edit_file_button.png';
import drop_file_button from '../assets/drop_file_button.png';
import image_file from '../assets/file_image.png';

const Card = ({ title, author, idDocument, darkMode, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const downloadFileUrl = `http://34.239.210.249:5000/download/${idDocument}`;

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
    <div className={`rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>
      <img src={preview ? `data:image/jpeg;base64,${preview}` : image_file} alt="File" className="w-full h-32 object-cover object-fit: contain" />
      <div className="p-2 ">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">Autor: {author}</p>
      </div>
      <div className="flex justify-around p-6 border-t-2 border-black">
        <button onClick={handleDownloadClick} disabled={isDownloading}>
          <img src={download_file_button} alt="Download" className="w-6 h-6" />
        </button>
        <button>
          <img src={edit_file_button} alt="Edit" className="w-6 h-6 object-fit: contain" />
        </button>
        <button>
          <img src={drop_file_button} alt="Delete" className="w-6 h-6 object-fit: contain" />
        </button>
      </div>
    </div>
  );
};

export default Card;
