import React, { useState, useEffect, useRef } from 'react';
import useTheme from "../theme";
import FeedItem from './components/inicio/item';

const styles = {
  page: {
    backgroundColor: '#95ACFC',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    overflowY: 'auto',
  },
  mainContent: {
    backgroundColor: '#ffffff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px',
  },
};

const Inicio = ({ userId }) => {
  const { darkMode } = useTheme();
  const hasFetched = useRef(false);
  const [document, setDocument] = useState([]);

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
      }
    };
    if (!hasFetched.current) {
      fetchDocuments();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.mainContent}>
        <h2 className="text-xl font-bold mb-2">USUARIOS</h2>
        <p>Publicaciones.</p>
        <div style={styles.flex}>
          {document.map((doc, index) => (
            <FeedItem
              key={index}
              username={doc.username}
              documentId={doc.documento_id}
              title={doc.titulo}
              description={doc.descripcion}
              userId={userId}
              careerId={doc.carrera_id}
              authorId={doc.usuario_id}
              darkMode={darkMode}
              preview={doc.preview_image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;

