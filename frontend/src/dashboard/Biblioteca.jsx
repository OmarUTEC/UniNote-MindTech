import React from 'react';
import useTheme from "../theme";
import Card from './cardsbiblioteca';

const Upload = ({ handleUploadFileClick }) => {
  const { darkMode } = useTheme();
  const title = 'Matemáticas Discretas 2 - Grafos';
  const author = "Omar";

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className="w-11/12 h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
        {[...Array(4)].map((_, index) => (
          <Card key={index} title={title} author={author} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
};

export default Upload;