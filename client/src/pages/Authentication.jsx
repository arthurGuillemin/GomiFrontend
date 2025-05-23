import React, { useEffect, useState, useContext } from 'react';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import { signup, login as loginService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSignUpMobile, setIsSignUpMobile] = useState(false);

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();



    const { isAuthenticated, login } = useContext(AuthContext);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsSignUpMobile(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

const handleSignup = async () => {
    try {
        const data = await signup({ username, email: signupEmail, password: signupPassword });

        alert("Votre compte a bien été créé !");

        setUsername('');
        setSignupEmail('');
        setSignupPassword('');
        if (isMobile) {
            setIsSignUpMobile(false);
        }
    } catch (error) {
        console.log(error.message);
        alert("Une erreur est survenue lors de l'inscription.");
    }
};


    const handleLogin = async () => {
        if (!loginEmail || !loginPassword) {
            alert('Email et mot de passe requis pour ce connecter')
        }
        try {
            const data = await loginService({ email: loginEmail, password: loginPassword });
            login({ token: data.token, user_id: data.user_id });
        } catch (error) {
            console.log(error.message);
        }
    };


    if (isAuthenticated) {
        navigate('/'); 
    }

    return (
        <div style={styles.authContainer}>
            {!isMobile && <h1 style={styles.authTitle}>Rejoignez-nous</h1>}

            <div style={styles.authContent}>
                {!isMobile && (
                    <>
                        <div style={{ ...styles.formContainer, ...styles.left }}>
                            <h2 style={styles.subtitle}>Créez-votre compte</h2>
                            <InputField label="Pseudo" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputField label="Email" placeholder="example@domain.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                            <InputField label="Mot de passe" type="password" placeholder="********" isPassword value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                            <div style={styles.buttonWrapper}>
                                <Button label="S'inscrire" onClick={handleSignup} />
                            </div>
                        </div>
                        <div style={styles.separator} />
                    </>
                )}

                {(!isMobile || !isSignUpMobile) && (
                    <div style={{ ...styles.formContainer, ...styles.right }}>
                        <h2 style={styles.subtitle}>Connectez-vous</h2>
                        <InputField label="Email" placeholder="example@domain.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        <InputField label="Mot de passe" type="password" placeholder="********" isPassword value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <div style={styles.buttonWrapper}>
                            <Button label="Se connecter" variant="outlined" onClick={handleLogin} />
                        </div>
                        {isMobile && (
                            <div>
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
                        <InputField label="Pseudo" placeholder="ArthurLaTutur" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <InputField label="Email" placeholder="ArthurLaTutur@gmail.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                        <InputField label="Mot de passe" type="password" placeholder="********" isPassword value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                        <div style={styles.buttonWrapper}>
                            <Button label="S'inscrire" onClick={handleSignup} />
                        </div>
                        <div>
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
                    src="/Together-cuate 1 (1).svg"
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
        marginTop: '20px',
        fontSize: '2.5rem',
        color: '#333',
    },
    authContent: {
        display: 'flex',
        justifyContent: 'space-between',
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
