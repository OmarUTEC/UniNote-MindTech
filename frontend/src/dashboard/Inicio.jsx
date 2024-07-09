import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import FeedItem from './components/inicio/item';
import SearchBar from './components/inicio/search_bar';

const Inicio = ({ userId }) => {
  const { darkMode } = useTheme();
  const hasFetched = useRef(false);
  const [document, setDocument] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetDocument = (listDocument) => {
    setDocument(listDocument);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const searchPath = `http://34.239.210.249:5000/document/general-search`;
        const response = await fetch(searchPath, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
        setDocument(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-5 relative overflow-hidden">
      <div className=" p-7 flex flex-col items-center rounded-xl shadow-lg w-full">
        <h2 className="text-xl font-bold mb-2 text-white">USUARIOS</h2>
        <p className="text-white">Publicaciones.</p>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        <SearchBar setDocument={handleSetDocument} />  {/* Usa el componente SearchBar con la primera letra mayúscula */}
        {isLoading ? (
          <p className="text-white">Cargando documentos...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full">
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
        )}
      </div>
    </div>
  );
};

export default Inicio;
