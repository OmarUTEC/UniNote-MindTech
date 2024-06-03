import React from 'react';
import useTheme from "../theme";
import upload_file from '../assets/upload_file_button.png';
import Card from './cards';

const Upload = ({ handleUploadFileClick }) => {
  const { darkMode } = useTheme();
  const title = 'Matemáticas Discretas 2 - Grafos';
  const author = "Omar";
  const uploadedFiles = 1;

  if (uploadedFiles === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
        <div className="flex flex-col items-center justify-center gap-6 text-2xl font-bold">
          <p>NO CUENTA CON NINGUN ARCHIVO DISPONIBLE PARA EDITAR</p>
          <button
            onClick={handleUploadFileClick}
            className={`rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 flex flex-col items-center w-48 h-48`}
          >
            <img src={upload_file} alt="Upload File" className="w-24 h-24" />
            <p className="text-base mt-4">SUBIR NUEVO ARCHIVO</p>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className="w-11/12 h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
      <button
      onClick={handleUploadFileClick}
      className={`rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-4 flex flex-col items-center w-full h-full`}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={upload_file} alt="Upload File" className="w-40 h-40 object-cover rounded-lg" />
      </div>
      <p className="text-base font-bold mt-4">SUBIR NUEVO ARCHIVO</p>
    </button>
        {[...Array(5)].map((_, index) => (
          <Card key={index} title={title} author={author} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
};

export default Upload;