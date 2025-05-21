import React, { useEffect, useState , useContext } from 'react';
import TrashFullPage from '../components/TrashResult/TrashFullPage';
import TrashPopup from '../components/TrashResult/TrashPopup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const TrashResultPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showPopup, setShowPopup] = useState(true);
      const { isAuthenticated } = useContext(AuthContext);
      const navigate = useNavigate();
    
        useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/auth');
        }
      }, [isAuthenticated, navigate]);
  

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
