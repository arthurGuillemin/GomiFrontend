import React from 'react';
import TrashIllustration from './TrashIllustration';

const TrashFullPage = ({ trashName, color }) => {
  return (
    <div style={styles.container}>
      <div style={styles.titleWrapper}>
        <h1 style={styles.title}>Je trie</h1>
      </div>
      <TrashIllustration color={color} />
      <p style={styles.description}>
          Votre déchet en <strong>{trashName}</strong> va dans la poubelle
        </p>

      <h2 style={{ fontFamily: "'Josefin Sans', sans-serif", color: getColor(color), fontSize: '40px' }}>
        {capitalize(color)}
      </h2>
    </div>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getColor = (color) => {
  switch (color) {
    case 'grise': return '#A9B1B7';
    case 'marron': return '#B05C5C';
    case 'verte': return '#34C759';
    case 'jaune': return '#FFC700';
    default: return '#000';
  }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 20px',
  },
  titleWrapper: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: '28px',
    color: '#B460C1',
    marginBottom: '20px',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  description: {
    fontSize: '20px',
    textAlign: 'center',
  },
};

export default TrashFullPage;
