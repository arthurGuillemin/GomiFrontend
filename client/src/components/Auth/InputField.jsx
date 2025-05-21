import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ label, placeholder, type = "text", isPassword = false  , value , onChange}) => {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={styles.container}>
            <label style={isMobile ? styles.labelSmall : styles.label}>{label}</label>
            <div style={styles.inputWrapper}>
                <input
                    type={isPassword ? (visible ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={isMobile ? styles.inputSmall : styles.input}
                />
                {isPassword && (
                    <span onClick={() => setVisible(!visible)} style={styles.eyeIcon}>
                        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        color: '#38A3A5',
        fontSize: '12px',
        fontWeight: '500',
        marginBottom: '5px',
    },
    labelSmall: {
        color: '#38A3A5',
        fontSize: '11px',
        fontWeight: '200',
        marginBottom: '5px',
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        width: '500px',
        border: 'none',
        borderBottom: '1px solid #38A3A5',
        padding: '5px 0',
        fontSize: '16px',
        fontWeight: '600',
        outline: 'none',
    },
    inputSmall: {
        width: '250px',
        border: 'none',
        borderBottom: '1px solid #38A3A5',
        padding: '5px 0',
        fontSize: '12px',
        fontWeight: '600',
        outline: 'none',
    },
    eyeIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#38A3A5',
    },
    placeholder: {
        color: '#EBEBEB',
    },
};

export default InputField;