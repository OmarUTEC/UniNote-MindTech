import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import LibraryItem from './components/library/item';
import Chat from './Chat';

const Library = ({ filters }) => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const hasFetched = useRef(false); 
  const { userId, careerId } = filters;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        let searchPath = `http://34.239.210.249:5000/library/${userId}`;
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

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`} style={{ height: '100vh' }}>
      <div className="ml-4 p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div className="fixed right-0 top-11 bottom-0 w-80 bg-white dark:bg-gray-800 p-4 flex-shrink-0">
        <Chat />
      </div>
    </div>
  );
  
  
};

export default Library;
