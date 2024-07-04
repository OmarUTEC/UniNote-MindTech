import React, { useState, useEffect } from 'react';
import download_file_button from '../icons/download_file_button.png';
import yes_like from '../icons/like.jpg';
import not_like from '../icons/unlike.jpg';
import eye_icon from '../icons/ojo.png';
import loading_spinner from '../icons/loading_spinner.gif';
import close_icon from '../icons/close.png';

const Item = ({ title, userId, careerId, authorId, documentId, darkMode, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [like, setLike] = useState(null);
  const [likeOperation, setLikeOperation] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isPdfDownloaded, setIsPdfDownloaded] = useState(false);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(`http://34.239.210.249:5000/${endpoint}/${userId}/${documentId}`, {
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
    const downloadFileUrl = `http://34.239.210.249:5000/download/${documentId}`;
    try {
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

  const handleViewPdfClick = async () => {
    if (isPdfDownloaded) {
      setShowPdfModal(true);
      return;
    }

    setIsPdfDownloading(true); 
    setIsLoading(true);
    setShowPdfModal(true);

    const viewPdfUrl = `http://34.239.210.249:5000/download/${documentId}`;

    try {
      const response = await fetch(viewPdfUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setPdfUrl(fileUrl);  
      setIsPdfDownloaded(true);
    } catch (error) {
      console.error('There was a problem with viewing the PDF:', error);
    } finally {
      setIsPdfDownloading(false); 
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
  };

  const handleOperationClick = async (type, setter, value, setterOperation, operationValue) => {
    if (operationValue) return;
    setterOperation(true);
    const data = { 'usuario_id': userId, 'documento_id': documentId };
    try {
      const response = await fetch(`http://34.239.210.249:5000/${type}`, {
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
      <button onClick={handleViewPdfClick} disabled={isLoading} className="w-full h-3/5 rounded-3xl overflow-hidden">
        <img src={`data:image/jpeg;base64,${preview}`} alt="File" className="w-full h-full rounded-3xl" />
      </button>
      <div className="w-full h-1/5 flex flex-col items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-gray-500">Autor: {authorId} - Carrera: {careerId}</p>
      </div>
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button onClick={handleDownloadClick} disabled={isDownloading} className="w-8 h-8">
          {isDownloading ? (
            <img src={loading_spinner} alt="Downloading..." className="w-full h-full" />
          ) : (
            <img src={download_file_button} alt="Download" />
          )}
        </button>
        <button onClick={handleViewPdfClick} disabled={isLoading || isPdfDownloading} className="w-8 h-8">
          {isLoading || isPdfDownloading ? (
            <img src={loading_spinner} alt="Loading" className="w-full h-full" />
          ) : (
            <img src={eye_icon} alt="View PDF" />
          )}
        </button>
        <button onClick={() => handleOperationClick('like', setLike, like, setLikeOperation, likeOperation)} disabled={likeOperation} className="w-8 h-8">
          <img src={like ? yes_like : not_like} alt="Like" />
        </button>
      </div>

      {showPdfModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg relative w-3/4 h-3/4">
            <button onClick={closeModal} className="absolute top-0 right-0 -mt-8 -mr-8 p-2 bg-gray-200 rounded-full shadow-md" style={{ cursor: 'pointer' }}>
              <img src={close_icon} alt="Close" className="w-6 h-6" />
            </button>
            {isLoading || isPdfDownloading ? (
              <div className="flex items-center justify-center h-full">
                <img src={loading_spinner} alt="Loading..." className="w-20 h-20 mr-3" />
                <p className="text-2xl">Cargando...</p>
              </div>
            ) : (
              <iframe 
                src={pdfUrl} 
                className="w-full h-full border-none"
                title={`PDF viewer for ${title}`}
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;