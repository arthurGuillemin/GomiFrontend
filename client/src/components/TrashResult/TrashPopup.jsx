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
        <h1 style={styles.title}>Je trie</h1>
        <TrashIllustration color={color} />
        <p style={styles.description}>
          Votre déchet en <strong>{trashName}</strong> va dans la poubelle
        </p>
        <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", color: getColor(color), fontSize: '40px' }}>
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
    fontSize: '20px',
    cursor: 'pointer',
  },
  title: {
    color: '#B460C1',
    textAlign: 'left',
    marginBottom: '20px',
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
