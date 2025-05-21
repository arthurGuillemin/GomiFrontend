import React, { useEffect, useState } from 'react';
import '../../App.css';

const Button = ({ label, variant = "filled", onClick }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <button
            style={{
                ...styles.button,
                ...(variant === "outlined" ? styles.outlined : styles.filled),
                width: isMobile ? '250px' : '350px',
                height: isMobile ? '35px' : '55px',
            }}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

const styles = {
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: "'Josefin Sans', sans-serif",
        cursor: 'pointer',
        marginTop: '15px',
    },
    filled: {
        backgroundColor: '#80ED99',
        color: 'white',
        border: 'none',
    },
    outlined: {
        backgroundColor: 'transparent',
        border: '1px solid #80ED99',
        color: '#34c759',
    }
};

export default Button;