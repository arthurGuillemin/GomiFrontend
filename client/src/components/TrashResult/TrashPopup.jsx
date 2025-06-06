import React from 'react';
import TrashIllustration from './TrashIllustration';

const TrashPopup = ({ trashName, color, onClose }) => {
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
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        <h2 style={styles.title}>Je trie</h2>
        <div style={styles.centeredIllustration}>
        <TrashIllustration color={color} />
        </div>
          <p style={styles.description}>
            Votre déchet en <strong>{trashName}</strong> va dans la poubelle : {' '}
            <span style={{ 
              fontFamily: "'Josefin Sans', sans-serif", 
              color: getColor(color), 
              fontSize: '2rem', 
              fontWeight: 'bold' , 
              paddingLeft: '1.7rem',
            }}>
            {capitalize(color)}
            </span>
          </p>
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
  },
  modal: {
    position: 'relative',
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: 'transparent',
    fontSize: '25px',
    cursor: 'pointer',
    color: '#B460C1',
  },
  title: {
    color: '#B460C1',
    marginBottom: '20px',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  description: {
    fontSize: '20px',
    marginBottom:  0,
  },
  trashColor: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  centeredIllustration: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
};

export default TrashPopup;
