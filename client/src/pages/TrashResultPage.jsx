import React, { useEffect, useState } from 'react';
import TrashFullPage from '../components/TrashResult/TrashFullPage';
import TrashPopup from '../components/TrashResult/TrashPopup';

const TrashResultPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showPopup, setShowPopup] = useState(true);

  const trashName = "plastique";
  const color = "grise";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showPopup && !isMobile) return null;

  return isMobile ? (
    <TrashFullPage trashName={trashName} color={color} />
  ) : (
    showPopup && <TrashPopup trashName={trashName} color={color} onClose={() => setShowPopup(false)} />
  );
};

export default TrashResultPage;
