import React, { useState, useEffect, useContext } from 'react';
import { Menu, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
    <header className={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <div className={`${styles.logoContainer} ${isMobile ? 'ml--10' : ''}`}>
            <img src="/logo.svg" alt="Logo" className={styles.logo} />
            <span className={styles.logoText}>Gomi</span>
          </div>
        </a>
        {isAuthenticated && (
          <span className={styles.welcomeText}>Bienvenue, {user.username}</span>
        )}
      </div>

      {isAuthenticated && (
        <>
          {isMobile ? (
            <div className={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={30} />
            </div>
          ) : (
            <nav className={styles.nav}>{renderLinks()}</nav>
          )}
        </>
      )}

      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
          <nav className={styles.navMobile}>
            {renderLinks()}
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
