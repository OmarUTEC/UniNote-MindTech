import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import Item from './components/bookshelf/item';

const Bookshelf = ({ userId }) => {
  const { darkMode } = useTheme();
  const [document, setDocument] = useState([]);
  const hasFetched = useRef(false); 

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        let searchPath = `http://127.0.0.1:5000/favourite/bookshelf/${userId}`;
        const response = await fetch(searchPath, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) { throw new Error('Network response was not ok'); }
        const data = await response.json();
        setDocument(data);
      } catch (error) { console.error('There was a problem with the fetch operation:', error); }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, [ userId ]);

  return (
    <div className={`flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-cach-l2 text-black'}`}>
      <div className="ml-4 p-6 flex-1">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12 overflow-y-auto">
        {document.map((document, index) => (
          <Item
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
    </div>
  );
};

export default Bookshelf;
