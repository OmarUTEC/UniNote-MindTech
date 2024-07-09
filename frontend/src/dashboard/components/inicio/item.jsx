import React, { useState, useEffect } from 'react';
import { FaUser, FaDownload, FaThumbsUp, FaStar, FaUserPlus, FaEye } from 'react-icons/fa';
import loading_spinner from '../icons/loading_spinner.gif';
import close_icon from '../icons/close.png';

const FeedItem = ({ username, description, title, userId, authorId, documentId, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [like, setLike] = useState(null);
  const [favourite, setFavourite] = useState(null);
  const [follow, setFollow] = useState(null);
  const [isLoading, setIsLoading] = useState({ like: false, favourite: false, follow: false });
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (endpoint, setter, data1, data2) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}/${data1}/${data2}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setter(data.answer);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };
    fetchData('likes/find', setLike, userId, documentId);
    fetchData('favourite/find', setFavourite, userId, documentId);
    fetchData('follow/find', setFollow, userId, authorId);
  }, [userId, authorId, documentId]);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/download/${documentId}`);
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
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOperationClick = async (type) => {
    if (isLoading[type]) return;
    setIsLoading(prev => ({ ...prev, [type]: true }));

    const data = type === 'follow' 
      ? { follower_id: userId, following_id: authorId }
      : { usuario_id: userId, documento_id: documentId };

    const currentValue = type === 'like' ? like : type === 'favourite' ? favourite : follow;
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/${type}`, {
        method: currentValue ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      
      if (type === 'like') setLike(!currentValue);
      else if (type === 'favourite') setFavourite(!currentValue);
      else setFollow(!currentValue);
    } catch (error) {
      console.error(`${type} operation error:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };
  const handleViewPdfClick = async () => {
    setShowPdfModal(true);
    if (!pdfUrl) {
      setIsPdfLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/download/${documentId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        setIsPdfLoading(false);
      }
    }
  };
  const closeModal = () => {
    setShowPdfModal(false);
  };
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden m-4 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaUser className="w-10 h-10 rounded-full bg-gray-200 p-2 mr-3" />
            <span className="text-xl font-semibold text-gray-800">{username}</span>
          </div>
          <button 
            onClick={() => handleOperationClick('follow')} 
            disabled={isLoading.follow}
            className={`flex items-center ${follow ? 'text-blue-400' : 'text-gray-500'} hover:text-blue-600 transition-colors duration-200`}
          >
            <FaUserPlus className={`w-6 h-6 ${isLoading.follow ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        <button onClick={handleViewPdfClick} className="w-full cursor-pointer">
          <img className="w-full h-48 object-cover rounded-lg mb-4" src={`data:image/jpeg;base64,${preview}`} alt={title} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors duration-200">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={() => handleOperationClick('like')} 
              disabled={isLoading.like}
              className={`flex items-center ${like ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-600 transition-colors duration-200`}
            >
              <FaThumbsUp className={`w-6 h-6 ${isLoading.like ? 'animate-pulse' : ''}`} />
            </button>
            <button 
              onClick={() => handleOperationClick('favourite')} 
              disabled={isLoading.favourite}
              className={`flex items-center ${favourite ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-600 transition-colors duration-200`}
            >
              <FaStar className={`w-6 h-6 ${isLoading.favourite ? 'animate-pulse' : ''}`} />
            </button>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleViewPdfClick}
              className="flex items-center text-gray-500 hover:text-gray-600 transition-colors duration-200"
            >
              <FaEye className="w-6 h-6" />
            </button>
            <button 
              onClick={handleDownloadClick} 
              disabled={isDownloading}
              className="flex items-center text-gray-500 hover:text-gray-600 transition-colors duration-200"
            >
              <FaDownload className={`w-6 h-6 ${isDownloading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {showPdfModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg relative w-3/4 h-3/4">
            <button onClick={closeModal} className="absolute top-0 right-0 -mt-8 -mr-8 p-2 bg-gray-200 rounded-full shadow-md">
              <img src={close_icon} alt="Close" className="w-6 h-6" />
            </button>
            {isPdfLoading ? (
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


export default FeedItem;