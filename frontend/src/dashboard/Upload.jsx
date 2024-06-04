import React, { useEffect, useState } from 'react';
import useTheme from "../theme";
import Card from './cards';
import UploadIcon from './UploadIcon'; // Import the SVG component

const Upload = ({ handleUploadFileClick }) => {
  const { darkMode } = useTheme();
  const title = 'Matemáticas Discretas 2 - Grafos';
  const author = "Omar";
  const uploadedFiles = 1;

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/documents', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchDocuments();
  }, []);

  if (uploadedFiles === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
        <div className="flex flex-col items-center justify-center gap-6 text-2xl font-bold">
          <p>NO CUENTA CON NINGUN ARCHIVO DISPONIBLE PARA EDITAR</p>
          <button
            onClick={handleUploadFileClick}
            className={`rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 flex flex-col items-center w-48 h-48`}
          >
            <div className="w-24 h-24"> {/* Ajustar el tamaño del contenedor */}
              <UploadIcon />
            </div>
            <p className="text-base mt-4">SUBIR NUEVO ARCHIVO</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <button onClick={handleUploadFileClick} className={`flex flex-col items-center w-full h-full rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4`}>
        <div className="w-24 h-24"> {/* Ajustar el tamaño del contenedor */}
          <UploadIcon />
        </div>
        <p className="text-base font-bold mt-4">SUBIR NUEVO ARCHIVO</p>
      </button>
  
      {documents.map((document, index) => (
        <Card key={index} title={document.titulo} author={document.usuario_id} darkMode={darkMode} />
      ))}
  
    </div>
  );
};

export default Upload;
