import React, { useState } from 'react';
import download_file_button from '../icons/download_file_button.png';
import edit_file_button from '../icons/edit_file_button.png';
import drop_file_button from '../icons/drop_file_button.png';
import eye_icon from '../icons/ojo.png';
import loading_spinner from '../icons/loading_spinner.gif';
import close_icon from '../icons/close.png';

const Item = ({ title, idDocument, darkMode, preview }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const downloadFileUrl = `http://127.0.0.1:5000/download/${idDocument}`;

    try {
      const response = await fetch(downloadFileUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
    setIsLoading(true);
    setShowPdfModal(true);

    const viewPdfUrl = `http://127.0.0.1:5000/download/${idDocument}`;

    try {
      const response = await fetch(viewPdfUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setPdfUrl(fileUrl);
    } catch (error) {
      console.error('There was a problem with viewing the PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
    setPdfUrl('');
  };

  return (
    <div className={`w-96 h-96
        flex flex-col items-center
        rounded-3xl border-2 border-black
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
        shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>

      <button onClick={handleViewPdfClick} disabled={isLoading} className="w-full h-3/5 rounded-3xl overflow-hidden">
        <img src={`data:image/jpeg;base64,${preview}`} alt="File" className="w-full h-full object-cover"/>
      </button>  

      <div className="w-full h-1/5 flex flex-col items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
      </div>
      
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className="w-8 h-8 relative" >
          {isDownloading ? (
            <img src={loading_spinner} alt="Loading" className="w-full h-full"/>
          ) : (
            <img src={download_file_button} alt="Download"/>
          )}
        </button>
        <button
          onClick={handleViewPdfClick}
          disabled={isLoading}
          className="w-8 h-8 relative" >
          {isLoading ? (
            <img src={loading_spinner} alt="Loading" className="w-full h-full"/>
          ) : (
            <img src={eye_icon} alt="View PDF"/>
          )}
        </button>
        <button className="w-8 h-8"><img src={edit_file_button} alt="Edit"/></button>
        <button className="w-8 h-8"><img src={drop_file_button} alt="Delete"/></button>
      </div>

      {showPdfModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg relative w-3/4 h-3/4">{/*tamaño de la visualizacion del pdf */}
            <button onClick={closeModal} className="absolute top-0 right-0 -mt-8 -mr-8 p-2 bg-gray-200 rounded-full shadow-md" style={{ cursor: 'pointer' }}>
              <img src={close_icon} alt="Close" className="w-6 h-6" />
            </button>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <img src={loading_spinner} alt="Loading..." className="w-20 h-20 mr-3" />
                 <p className="text-2xl"> Cargando...</p>
              </div>
            ) : (
              <iframe src={pdfUrl} className="w-full h-full border-none"></iframe>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Item;