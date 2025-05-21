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
            <a href="/" style={{ textDecoration: 'none' }}>
                <div
                    style={{
                        ...styles.logoContainer,
                        ...(isMobile && { marginLeft: '-35px' })
                    }}
                >
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        style={styles.logo}
                    />
                    <span style={styles.logoText}>Gomi</span>
                </div>
            </a>

            {isAuthenticated && (
                <>
                    {isMobile ? (
                        <div style={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu size={30} />
                        </div>
                    ) : (
                        <nav style={styles.nav}>
                            <a href="/" style={styles.navLink}>Accueil</a>
                            <a href="/je-trie" style={styles.navLink}>Poubelle</a>
                            <a href="/je-cuisine" style={styles.navLink}>Frigo</a>
                            <a href="/contact" style={styles.navLink}>Contact</a>
                            <a href="/profil" style={styles.navLink}>Profile</a>
                        </nav>
                    )}
                </>
            )}

            {isMenuOpen && (
                <>
                    <div
                        style={styles.overlay}
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <nav style={styles.navMobile}>
                        <a href="/" style={styles.navLink}>Accueil</a>
                        <a href="/je-trie" style={styles.navLink}>Poubelle</a>
                        <a href="/je-cuisine" style={styles.navLink}>Frigo</a>
                        <a href="/contact" style={styles.navLink}>Contact</a>
                        <a href="/profil" style={styles.navLink}>Profile</a>
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
        marginTop: '10px'
    },
    navMobile: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: '15px 20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        gap: '10px',
    },
    navLink: {
        fontSize: '18px',
        textDecoration: 'none',
        color: '#333',
        fontFamily: "'Josefin Sans', sans-serif",
        textAlign: 'center',
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