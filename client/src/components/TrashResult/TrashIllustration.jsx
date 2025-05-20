import React from 'react';
import grey from '../../assets/grey.svg';
import brown from '../../assets/brown.svg';
import green from '../../assets/green.svg';
import yellow from '../../assets/yellow.svg';

const images = {
  grise: grey,
  marron: brown,
  verte: green,
  jaune: yellow,
};

const TrashIllustration = ({ color }) => {
  return <img src={images[color]} alt={`Poubelle ${color}`} style={{ width: '300px' }} />;
};

export default TrashIllustration;