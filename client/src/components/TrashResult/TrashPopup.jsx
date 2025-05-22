import React, { useEffect, useState } from 'react';
import TrashIllustration from './TrashIllustration';

const TrashPopup = ({ trashName, color, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColor = (color) => {
    switch (color) {
      case 'grise': return '#A9B1B7';
      case 'marron': return '#B05C5C';
      case 'verte': return '#34C759';
      case 'jaune': return '#FFC700';
      default: return '#000';
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div style={styles.overlay}>
      <div style={{
        ...styles.modal,
        width: isMobile ? '60%' : '400px',
        padding: isMobile ? '20px' : '30px',
      }}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? '20px' : '40px',
          textAlign: 'left',
        }}>Je trie</h1>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TrashIllustration color={color} />
        </div>

        <p style={{
          ...styles.description,
          fontSize: isMobile ? '14px' : '20px',
          margin: isMobile ? '5px 0' : '15px 0',
        }}>
          Votre déchet en <strong>{trashName}</strong> va dans la poubelle
        </p>

        <h2 style={{
          fontFamily: "'Josefin Sans', sans-serif",
          color: getColor(color),
          fontSize: isMobile ? '28px' : '40px',
          margin: 0,
        }}>
          {capitalize(color)}
        </h2>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '10px',
  },
  modal: {
    position: 'relative',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#B460C1',
  },
  title: {
    color: '#B460C1',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  description: {
    fontSize: '20px',
  },
  trashColor: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

export default TrashPopup;
