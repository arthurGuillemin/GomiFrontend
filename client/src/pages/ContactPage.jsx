import React, { useEffect, useState } from 'react';
import contactIllustration from '/contact.svg';

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      padding: isMobile ? '20px' : '50px',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: isMobile ? 'center' : 'left',
    },
    image: {
      maxWidth: isMobile ? '70%' : '400px',
      width: '100%',
      marginBottom: isMobile ? '20px' : 0,
    },
    content: {
      marginLeft: isMobile ? '0' : '40px',
    },
    title: {
      fontSize: isMobile ? '16px' : '20px',
      fontWeight: 'bold',
      color: '#333',
      fontFamily: "'Josefin Sans', sans-serif",
      marginTop: isMobile ? '0' : '10px',
    },
  };

  return (
    <div style={styles.page}>
      <img src={contactIllustration} alt="Contact" style={styles.image} />
      <div style={styles.content}>
        <h1 style={styles.title}>Kelly Goncalves Gama</h1>
        <h1 style={styles.title}>Arthur Guillemin</h1>
        <h1 style={styles.title}>Rayan Annic</h1>
        <h1 style={styles.title}>Saad Abi</h1>
        <h1 style={styles.title}>Emilie Caverne</h1>
      </div>
    </div>
  );
};

export default ContactPage;
