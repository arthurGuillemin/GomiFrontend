import React from 'react';
import grey from '/grey.svg';
import brown from '/brown.svg';
import green from '/green.svg';
import yellow from '/yellow.svg';
import { useState, useEffect } from 'react';

const images = { grise: grey, marron: brown, verte: green, jaune: yellow };

const TrashIllustration = ({ color }) => (
  <img src={images[color]} alt={`Poubelle ${color}`} style={{ width: '200px' }} />
);


export default TrashIllustration;