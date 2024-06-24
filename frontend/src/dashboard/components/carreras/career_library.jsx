import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../../../theme";
import LibraryItem from '../library/item';

const SearchByCareer = ({ userId, careerId }) => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/documents/career/${userId}/${careerId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        setDocuments(data);
      } catch (error) { console.error('There was a problem with the fetch operation:', error); }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, [userId,careerId]);

  return (    
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12 overflow-y-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      {/*
      {documents.map((document, index) => (
        <LibraryItem
          key={index}
          title={document.titulo}
          documentId={document.documento_id}
          userId={userId}
          authorId={document.usuario_id}
          darkMode={darkMode}
          preview={document.preview_image}
        />
      ))}
      */}
      <p> ID Usuario: {userId} </p>
      <p> ID Carrera: {careerId} </p>
    </div>
  );
};

export default SearchByCareer;