import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pub from '../assets/pub.png';
import user from '../assets/user.png';
import estrella from '../assets/estrella.png';
import like from '../assets/like.png';
import descarga from '../assets/descarga.png';

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
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  feedContainer: {
    width: '100%',
    maxWidth: '300px',
    backgroundColor: '#ffffff',
    border: '1px solid #dddddd',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  feedHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #dbdbdb',
    backgroundColor: '#CCD1D1',
  },
  feedHeaderImg: {
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    marginRight: '10px',
  },
  username: {
    fontWeight: 'bold',
  },
  feedFooter: {
    padding: '10px',
  },
  iconButtons: {
    display: 'flex',
    marginRight: '30px',
    alignItems: 'center',
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  iconNumber: {
    fontSize: '8px',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'cyan',
    borderRadius: '10%',
    padding: '1px 5px',
    marginLeft: '-7px',
    boxShadow: '0 6px 4px rgba(0, 0, 0, 0.2)',
  },
  description: {
    fontSize: '14px',
    color: '#262626',
  },
};

const FeedItem = ({ username, description }) => {
  const [clicks, setClicks] = useState({ star: false, like: false, download: false });

  const handleButtonClick = (type) => {
    setClicks((prevClicks) => ({
      ...prevClicks,
      [type]: !prevClicks[type],
    }));
  };

  return (
    <div style={styles.feedContainer}>
      <div style={styles.feedHeader}>
        <img src={user} alt="Avatar usuario" style={styles.feedHeaderImg} />
        <span style={styles.username}>{username}</span>
      </div>
      <img src={pub} alt="Publicación" className="h-12" />
      <div style={styles.feedFooter}>
        <div style={styles.iconButtons}>
          <button onClick={() => handleButtonClick('star')}>
            <img src={estrella} alt="star" style={styles.icon} />
            <span style={styles.iconNumber}>{clicks.star ? 1 : 0}</span>
          </button>
          <button onClick={() => handleButtonClick('like')}>
            <img src={like} alt="like" style={styles.icon} />
            <span style={styles.iconNumber}>{clicks.like ? 1 : 0}</span>
          </button>
          <button onClick={() => handleButtonClick('download')}>
            <img src={descarga} alt="download" style={styles.icon} />
            <span style={styles.iconNumber}>{clicks.download ? 1 : 0}</span>
          </button>
        </div>
        <div style={styles.description}>
          <strong></strong> {description}
        </div>
      </div>
    </div>
  );
};

const Inicio = () => (
  <div style={styles.page}>
    <div style={styles.mainContent}>
      <h2 className="text-xl font-bold mb-2">USUARIOS</h2>
      <p>Publicaciones.</p>
      <Link to="/inicio" className="text-blue-500"></Link>

      <div style={styles.flex}>
        <FeedItem username="Noe" description="Descripción de la publicación 1." />
        <FeedItem username="Javier" description="Descripción de la publicación 2." />
        <FeedItem username="Santiago" description="Descripción de la publicación 3." />
        <FeedItem username="Sebastian" description="Descripción de la publicación 4." />
        <FeedItem username="Nicol" description="Descripción de la publicación 5." />
        <FeedItem username="Santiago" description="Descripción de la publicación 6." />
      </div>
    </div>
  </div>
);

export default Inicio;
