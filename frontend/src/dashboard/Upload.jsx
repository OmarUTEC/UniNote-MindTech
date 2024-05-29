import React from 'react';
import useTheme from "../theme";
import './Upload.css';

import upload_file from '../assets/upload_file_button.png';
import download_file_button from '../assets/download_file_button.png';
import edit_file_button from '../assets/edit_file_button.png';
import drop_file_button from '../assets/drop_file_button.png';
import image_file from '../assets/file_image.png';

const Upload = ({ handleUploadFileClick }) => {
  const { darkMode } = useTheme();
  const title = 'Matemáticas Discretas 2 - Grafos';
  const author = "Omar";
  const uploadedFiles = 1;

  if(uploadedFiles === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
        <div className={`not-uploaded-file`}>
          <p>NO CUENTA CON NINGUN ARCHIVO DISPONIBLE PARA EDITAR</p>
          <button onClick={handleUploadFileClick} className={`item upload-file-button ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <img src={upload_file} alt="Upload File" className={`upload-file-image`}/>
          <p className={`upload-file-button-text ${darkMode ? 'text-white' : 'text-black'}`}>SUBIR NUEVO ARCHIVO</p>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>

    <div className={`item-controller`}>
      
      <button onClick={handleUploadFileClick} className={`item upload-file-button ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <img src={upload_file} alt="Upload File" className={`upload-file-image`}/>
        <p className={`upload-file-button-text ${darkMode ? 'text-white' : 'text-black'}`}>SUBIR NUEVO ARCHIVO</p>
      </button>
      
      <div className={`item uploaded-file-item`}>
        <img src={image_file} alt="File" className='view-file'/>
        <div className={`file-description`}>
          <p>{title}</p>
          <p>Autor: {author}</p>
        </div>
        <div className={`options-bar`}>
          <button> <img src={download_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={edit_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={drop_file_button} alt="Option" className='image-option' /> </button>
        </div>
      </div>

      <div className={`item uploaded-file-item`}>
        <img src={image_file} alt="File" className='view-file'/>
        <div className={`file-description`}>
          <p>{title}</p>
          <p>Autor: {author}</p>
        </div>
        <div className={`options-bar`}>
          <button> <img src={download_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={edit_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={drop_file_button} alt="Option" className='image-option' /> </button>
        </div>
      </div>

      <div className={`item uploaded-file-item`}>
        <img src={image_file} alt="File" className='view-file'/>
        <div className={`file-description`}>
          <p>{title}</p>
          <p>Autor: {author}</p>
        </div>
        <div className={`options-bar`}>
          <button> <img src={download_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={edit_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={drop_file_button} alt="Option" className='image-option' /> </button>
        </div>
      </div>



      <div className={`item uploaded-file-item`}>
        <img src={image_file} alt="File" className='view-file'/>
        <div className={`file-description`}>
          <p>{title}</p>
          <p>Autor: {author}</p>
        </div>
        <div className={`options-bar`}>
          <button> <img src={download_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={edit_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={drop_file_button} alt="Option" className='image-option' /> </button>
        </div>
      </div>


      <div className={`item uploaded-file-item`}>
        <img src={image_file} alt="File" className='view-file'/>
        <div className={`file-description`}>
          <p>{title}</p>
          <p>Autor: {author}</p>
        </div>
        <div className={`options-bar`}>
          <button> <img src={download_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={edit_file_button} alt="Option" className='image-option' /> </button>
          <button> <img src={drop_file_button} alt="Option" className='image-option' /> </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Upload;