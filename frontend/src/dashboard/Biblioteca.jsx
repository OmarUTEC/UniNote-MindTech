import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import LibraryItem from './components/library/item';

const Library = ({ filters }) => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const hasFetched = useRef(false); 
  const { userId, careerId } = filters;

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
  }, [ userId, careerId ]);

  return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12 overflow-y-auto">
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
  );
};

export default Library;
