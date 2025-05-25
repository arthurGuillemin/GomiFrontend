import React, { useState, useEffect, useContext } from 'react';
import { Menu, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { getUserNameById } from '../services/userService';
const Header = () => {
  const { isAuthenticated, user , token } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [username, setUsername] = useState('');
  const location = useLocation();
  

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const getUsername = async (id, token) => {
    try {
      const data = await getUserNameById(id, token);
      setUsername(data.username);
    } catch (error) {
      console.log(error.message);
    }
  };
useEffect(() => {

  if (user?.id && token) {
    getUsername(user.id, token);
  }
}, [user, token]);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getHoverColor = (label) => {
    switch (label) {
      case 'Accueil': return '#80ED99';
      case 'Je trie': return '#BA68C8';
      case 'Je cuisine': return '#FFC100';
      case 'Contact': return '#52C5FF';
      default: return '#38A3A5';
    }
  };

  const navLinkStyle = (label) => ({
    fontSize: '18px',
    textDecoration: 'none',
    fontFamily: "'Josefin Sans', sans-serif",
    textAlign: 'center',
    color: hoveredLink === label ? getHoverColor(label) : '#333',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  });

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/je-trie', label: 'Je trie' },
    { to: '/je-cuisine', label: 'Je cuisine' },
    { to: '/contact', label: 'Contact' },
    {
      to: '/profil',
      label: isMobile ? 'Profil' : '',
      icon: !isMobile && (
        <span style={{
          display: 'inline-block',
          marginLeft: '20px',
          transition: 'color 0.3s ease',
          color: hoveredLink === 'Profil' ? '#38A3A5' : 'black',
        }}>
          <User size={35} />
        </span>
      )
    }
  ];

  const renderLinks = () =>
    links.map(({ to, label, icon }) => (
      <Link
        key={to}
        to={to}
        style={navLinkStyle(label)}
        onMouseEnter={() => setHoveredLink(label)}
        onMouseLeave={() => setHoveredLink(null)}
      >
        {icon || label}
      </Link>
    ));

  return (
    <header style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <div style={{ ...styles.logoContainer, ...(isMobile && { marginLeft: '-10px' }) }}>
            <img src="/logo.svg" alt="Logo" style={styles.logo} />
            <span style={styles.logoText}>Gomi</span>
          </div>
        </a>
        {isAuthenticated && (
          <span style={styles.welcomeText}>Bienvenue, {username}</span>
        )}
      </div>

      {isAuthenticated && (
        <>
          {isMobile ? (
            <div style={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={30} />
            </div>
          ) : (
            <nav style={styles.nav}>{renderLinks()}</nav>
          )}
        </>
      )}

      {isMenuOpen && (
        <>
          <div style={styles.overlay} onClick={() => setIsMenuOpen(false)} />
          <nav style={styles.navMobile}>
            {renderLinks()}
          </nav>
        </>
      )}
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #e5e5e5',
    height: '60px',
    position: 'relative',
    backgroundColor: '#fff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: "'Josefin Sans', sans-serif",
    color: '#333',
    marginTop: '10px',
  },
  welcomeText: {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: '18px',
    color: '#80ED99',
    marginTop: '10px',
    marginLeft: '50px',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    marginRight: '40px',
    marginTop: '10px',
  },
  burgerMenu: {
    display: 'block',
    cursor: 'pointer',
    marginTop: '10px',
  },
  navMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '85%',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '0 0 8px 8px',
    padding: '15px 20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    gap: '15px',
  },
  overlay: {
    position: 'fixed',
    top: 80,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 999,
  },
};

export default Header;