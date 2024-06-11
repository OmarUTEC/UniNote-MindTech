import React from 'react';
import UploadIcon from '../icons/upload_file';

const Button = ({ handleClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
    <button onClick={handleClick} className={`rounded-lg border-2 border-black bg-white flex flex-col items-center justify-center w-80 h-80 gap-4`}>
    <div className={`w-7/12 h-7/12`}>
      <UploadIcon color={'black'} />
    </div>
    <p className="text-lg font-bold">SUBIR NUEVO ARCHIVO</p>
    </button>
    </div>
  );
};

export default Button;