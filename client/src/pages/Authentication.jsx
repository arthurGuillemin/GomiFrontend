import React, { useEffect, useState } from 'react';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';

const Authentication = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSignUpMobile, setIsSignUpMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsSignUpMobile(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={styles.authContainer}>
            {!isMobile && <h1 style={styles.authTitle}>Rejoignez-nous</h1>}

            <div style={styles.authContent}>
                {!isMobile && (
                    <>
                        <div style={{ ...styles.formContainer, ...styles.left }}>
                            <h2 style={styles.subtitle}>Créez-votre compte</h2>
                            <InputField label="Pseudo" placeholder="ArthurLaTutur" />
                            <InputField label="Email" placeholder="ArthurLaTutur@gmail.com" />
                            <InputField label="Mot de passe" type="password" placeholder="********" isPassword />
                            <div style={styles.buttonWrapper}>
                                <Button label="S'inscrire" />
                            </div>
                        </div>
                        <div style={styles.separator} />
                    </>
                )}

                {(!isMobile || !isSignUpMobile) && (
                    <div style={{ ...styles.formContainer, ...styles.right }}>
                        <h2 style={styles.subtitle}>Connectez-vous</h2>
                        <InputField label="Email" placeholder="ArthurLaTutur@gmail.com" />
                        <InputField label="Mot de passe" type="password" placeholder="********" isPassword />
                        <div style={styles.buttonWrapper}>
                            <Button label="Se connecter" variant="outlined" />
                        </div>
                        {isMobile && (
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    label="Créer un compte"
                                    variant="outlined"
                                    onClick={() => setIsSignUpMobile(true)}
                                />
                            </div>
                        )}
                    </div>
                )}

                {isMobile && isSignUpMobile && (
                    <div style={{ ...styles.formContainer, ...styles.left }}>
                        <h2 style={styles.subtitle}>Créez-votre compte</h2>
                        <InputField label="Pseudo" placeholder="ArthurLaTutur" />
                        <InputField label="Email" placeholder="ArthurLaTutur@gmail.com" />
                        <InputField label="Mot de passe" type="password" placeholder="********" isPassword />
                        <div style={styles.buttonWrapper}>
                            <Button label="S'inscrire" />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Button
                                label="Retour"
                                variant="outlined"
                                onClick={() => setIsSignUpMobile(false)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.authIllustration}>
                <img
                    src="/src/assets/Together-cuate 1 (1).svg"
                    alt="Illustration"
                    style={{
                        width: isMobile ? '250px' : '350px',
                        backgroundColor: 'transparent',
                        transform: isMobile ? 'none' : 'translateX(100px)',
                    }}
                />
            </div>
        </div>
    );
};

const styles = {
    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        fontFamily: "'Josefin Sans', sans-serif",
    },
    authTitle: {
        fontSize: '2.5rem',
        color: '#333',
    },
    authContent: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        overflow: 'hidden',
        position: 'relative',
        flexWrap: 'wrap',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        flex: 1,
    },
    left: {
        alignItems: 'center',
    },
    right: {
        alignItems: 'center',
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '15px',
        color: '#80ED99',
        textAlign: 'center',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '20px',
    },
    separator: {
        width: '1px',
        backgroundColor: '#e5e5e5',
        height: '100%',
    },
    authIllustration: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        height: '100px',
    },
};

export default Authentication;
