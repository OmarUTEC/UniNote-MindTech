import React, { useState } from 'react';
import download_file_button from '../icons/download_file_button.png';
import unlike from '../icons/unlike.jpg';
import like from '../icons/like.jpg';
import unfavourite from '../icons/unfavourite.png';
import favourite from '../icons/favourite.png';
import image_file from '../icons/file_image.png';

const Item = ({ title, author, darkMode }) => {
  const [markedLike, setLike] = useState(false);
  const [markedFavourite, setFavourite] = useState(false);

  const toggleLike = () => {
    setLike(prevLike => !prevLike);
  };

  const toggleFavourite = () => {
    setFavourite(prevFarourite => !prevFarourite);
  };
  
  return (
    <div className={`w-96 h-96
      flex flex-col items-center
      rounded-3xl border-2 border-black
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-md transform-origin-center transition-transform duration-300 ease-in-out`}>
      
      <div className="w-full h-3/5">
        {/*<img src={`data:image/jpeg;base64,${preview}`} alt="File" className="w-full h-full rounded-3xl"/>*/}
        <img src={image_file} alt="File" className="w-full h-full rounded-3xl" />
      </div>
      
      <div className="w-full h-1/5 flex flex-col items-center justify-center border-t-2 border-b-2 border-black">
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm text-gray-500">Autor: {author}</p>
      </div>
      
      <div className="w-full h-1/5 flex items-center justify-around p-1">
        <button>
          <img className="w-8 h-8" src={download_file_button} alt="Download" />
        </button>
        <button onClick={toggleLike}>
          <img className="w-8 h-8" src={markedLike ? like : unlike} alt="Like" />
        </button>
        <button onClick={toggleFavourite}>
          <img className="w-8 h-8" src={markedFavourite ? favourite : unfavourite} alt="favoritos" />
        </button>
      </div>

    </div>
  );
};

export default Item;
