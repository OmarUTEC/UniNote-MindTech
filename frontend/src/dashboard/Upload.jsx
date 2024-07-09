import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";

import UploadFileButton from './components/upload/button';
import UploadFileItem from './components/upload/item';

const Upload = ({ userId, handleUploadFileClick }) => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://34.239.210.249:5000/documents/user/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDocuments(data);
        setUploadedFiles(data.length);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, [userId]);

  if (uploadedFiles === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
        <div className="flex flex-col items-center justify-center gap-12">
          <p className="text-2xl font-bold">NO CUENTA CON NINGUN ARCHIVO DISPONIBLE PARA EDITAR</p>
          <UploadFileButton handleClick={handleUploadFileClick}/>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <UploadFileButton handleClick={handleUploadFileClick}/>
      
      {documents.map((document, index) => (
        <UploadFileItem
          key={index}
          title={document.titulo}
          author={document.usuario_id}
          idDocument={document.documento_id}
          darkMode={darkMode}
          preview={document.preview_image}
        />
      ))}
    </div>
  );
};

export default Upload;
