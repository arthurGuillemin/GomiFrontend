import React from 'react';
import grey from '/grey.svg';
import brown from '/brown.svg';
import green from '/green.svg';
import yellow from '/yellow.svg';

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