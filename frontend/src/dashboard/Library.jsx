import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import LibraryItem from './components/library/item';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'; // Importar los íconos de flecha derecha e izquierda
import Chat from './Chat';

const Library = ({ filters }) => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const hasFetched = useRef(false);
  const { userId, careerId } = filters;
  const [showChat, setShowChat] = useState(false); // Estado para controlar si el chat está visible o no

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        let searchPath = `http://127.0.0.1:5000/library/${userId}`;
        if (careerId !== 0) { searchPath += `/career/${careerId}`; }
        const response = await fetch(searchPath, {
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
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, [userId, careerId]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`} style={{ height: '100vh' }}>
      <div className="ml-4 p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Cambio a grid-cols-3 en pantallas medianas */}
          {documents.map((document, index) => (
            <LibraryItem
              key={index}
              title={document.titulo}
              documentId={document.documento_id}
              userId={userId}
              careerId={document.carrera_id}
              authorId={document.usuario_id}
              darkMode={darkMode}
              preview={document.preview_image}
            />
          ))}
        </div>
      </div>
      {!showChat && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-14 bg-gray-000 dark:bg-gray-000 flex-shrink-0 flex items-center justify-center">
          <button onClick={toggleChat} className="w-full h-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none">
            <FiChevronLeft size={24} />
          </button>
        </div>
      )}
      <div className={`fixed right-0 top-11 bottom-0 w-80 bg-white dark:bg-gray-800 p-4 flex-shrink-0 transform transition-transform duration-300 ${showChat ? 'translate-x-0' : 'translate-x-full'}`}>
        {showChat && (
          <button onClick={closeChat} className="absolute top-1/2 -left-8 transform -translate-y-1/2 dark:bg-gray-700 text-black-600 dark:text-gray-000 p-2 hover:bg-gray-000 dark:hover:bg-gray-300 focus:outline-none">
            <FiChevronRight size={24} />
          </button>
        )}
        <Chat />
      </div>
    </div>
  );
};

export default Library;
