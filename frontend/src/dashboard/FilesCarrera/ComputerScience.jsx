import React from "react";
import useTheme from "../../theme";
import Chat from "../Chat";

import upload_file from '../../assets/upload_file.png';
import download_file_button from '../../assets/download_file_button.png';
import edit_file_button from '../../assets/edit_file_button.png';
import drop_file_button from '../../assets/drop_file_button.png';
import image_file from '../../assets/file_image.png';

const ComputerScience = () => {
  const { darkMode } = useTheme();
  const title = 'Matemáticas Discretas 2 - Grafos';
  const author = "Omar";
  const uploadedFiles = 1;

  if (uploadedFiles === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
        <div className="flex flex-col items-center justify-center gap-8 text-2xl font-bold">
          <p>NO CUENTA CON NINGUN ARCHIVO DISPONIBLE PARA EDITAR</p>
          <button className={`flex flex-col items-center justify-center bg-white p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <img src={upload_file} alt="Upload File" className="w-2/3 h-3/5 mb-4" />
            <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>SUBIR NUEVO ARCHIVO</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex`}>
      <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-80 h-80 m-4 border-4 border-black rounded-2xl bg-white dark:bg-gray-800">
            <img src={image_file} alt="File" className="w-full h-1/2 object-cover rounded-t-2xl" />
            <div className="w-full h-1/4 flex flex-col items-center justify-center text-xl border-t-4 border-b-4 border-black">
              <p>{title}</p>
              <p>Autor: {author}</p>
            </div>
            <div className="w-full h-1/4 flex items-center justify-center space-x-8">
              <button>
                <img src={download_file_button} alt="Download" className="w-8 h-8" />
              </button>
              <button>
                <img src={edit_file_button} alt="Edit" className="w-8 h-8" />
              </button>
              <button>
                <img src={drop_file_button} alt="Delete" className="w-8 h-8" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/6 h-screen bg-white dark:bg-gray-800 p-4">
        <Chat />
      </div>
    </div>
  );
}

export default ComputerScience;
