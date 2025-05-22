import React, { useEffect, useState , useContext } from 'react';
import contactIllustration from '/contact.svg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

    useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    page: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      padding: isMobile ? '20px' : '150px',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: isMobile ? 'center' : 'left',
    },
    image: {
      maxWidth: isMobile ? '70%' : '500px',
      width: '100%',
      marginBottom: isMobile ? '20px' : 0,
    },
    content: {
      marginLeft: isMobile ? '0' : '40px',
    },
    title: {
      fontSize: isMobile ? '16px' : '20px',
      fontFamily: "'Josefin Sans', sans-serif",
      marginTop: isMobile ? '0' : '10px',
    },
  };

  return (
    <div style={styles.page}>
      <img src={contactIllustration} alt="Contact" style={styles.image} />
      <div style={styles.content}>
        <a href='https://github.com/yelineeee' className="contact-link"><h1 style={styles.title}>Kelly Goncalves Gama - Développeuse react</h1></a>
        <a href='https://github.com/arthurGuillemin' className="contact-link"><h1 style={styles.title}>Arthur Guillemin - Développeur Back & IA</h1></a>
        <a href='https://github.com/gladiaaa' className="contact-link"><h1 style={styles.title}>Ryan Annic - Développeur Ia</h1></a>
        <a href='https://github.com/emilie-caverne' className="contact-link"><h1 style={styles.title}>Emilie Caverne - Développeuse react</h1></a>
      </div>
    </div>
  );
};

export default ContactPage;
