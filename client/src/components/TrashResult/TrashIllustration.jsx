import React from 'react';
import grey from '/grey.svg';
import brown from '/brown.svg';
import green from '/green.svg';
import yellow from '/yellow.svg';
import { useState, useEffect } from 'react';

const images = {
  grise: grey,
  marron: brown,
  verte: green,
  jaune: yellow,
};

const TrashIllustration = ({ color }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return <img src={images[color]} alt={`Poubelle ${color}`} style={{ maxWidth: isMobile ? '120px' : '250px' }}/>;
};

export default TrashIllustration;