import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Header = ({ isAuthenticated = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <img
                    src="/src/assets/logo.svg"
                    alt="Logo"
                    style={styles.logo}
                />
                <span style={styles.logoText}>Gomi</span>
            </div>

            {isAuthenticated && (
                <>
                    {isMobile ? (
                        <div style={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu size={28} />
                        </div>
                    ) : (
                        <nav style={styles.nav}>
                            <a href="/" style={styles.navLink}>Accueil</a>
                            <a href="/poubelle" style={styles.navLink}>Poubelle</a>
                            <a href="/frigo" style={styles.navLink}>Frigo</a>
                            <a href="/contact" style={styles.navLink}>Contact</a>
                        </nav>
                    )}
                </>
            )}

            {isMenuOpen && (
                <nav style={styles.navMobile}>
                    <a href="/" style={styles.navLink}>Accueil</a>
                    <a href="/poubelle" style={styles.navLink}>Poubelle</a>
                    <a href="/frigo" style={styles.navLink}>Frigo</a>
                    <a href="/contact" style={styles.navLink}>Contact</a>
                </nav>
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
        marginLeft: '40px',
    },
    logoText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        fontFamily: "'Josefin Sans', sans-serif",
        color: '#333',
        marginTop: '10px'
    },
    nav: {
        display: 'flex',
        gap: '20px',
        marginRight: '40px',
        marginTop: '25px'
    },
    burgerMenu: {
        display: 'block',
        cursor: 'pointer',
    },
    navMobile: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '60px',
        right: '10px',
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        padding: '10px',
        zIndex: 1000,
    },
    navLink: {
        fontSize: '1rem',
        textDecoration: 'none',
        color: '#333',
        fontFamily: "'Josefin Sans', sans-serif",
        marginBottom: '10px',
    },
};

export default Header;