import React from 'react';
import download_file_button from '../assets/download_file_button.png';
import edit_file_button from '../assets/edit_file_button.png';
import drop_file_button from '../assets/drop_file_button.png';
import image_file from '../assets/file_image.png';

const Card = ({ title, author, darkMode }) => {
  return (
    <div className={`rounded-lg border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>
      <img src={image_file} alt="File" className="w-full h-32 object-cover object-fit: contain" />
      <div className="p-2 ">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">Autor: {author}</p>
      </div>
      <div className="flex justify-around items-center p-6 border-t-2 border-black">
        <button>
          <img src={download_file_button} alt="Download" className="w-6 h-6 object-fit: contain" />
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