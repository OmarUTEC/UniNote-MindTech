import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import FeedItem from './components/inicio/item';

const Inicio = ({userId}) => {
  const { darkMode } = useTheme();
  const hasFetched = useRef(false);
  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const searchPath = `http://127.0.0.1:5000/document/general-search`;
        const response = await fetch(searchPath, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message);
      }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, []); 

  return (
    <div className="bg-blue-400 min-h-screen flex justify-center items-center p-5 relative overflow-hidden">
      <div className="bg-blue-400 p-7 flex flex-col items-center rounded-xl shadow-lg w-full max-w-5xl">
        <h2 className="text-xl font-bold mb-2">USUARIOS</h2>
        <p>Publicaciones.</p>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {document.map((doc, index) => (
            <FeedItem
              key={index}
              username={doc.username}
              title={doc.titulo}
              description={doc.descripcion}
              preview={doc.preview_image}
              documentId={doc.documento_id}
              userId={userId}
              careerId={doc.carrera_id}
              authorId={doc.usuario_id}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
