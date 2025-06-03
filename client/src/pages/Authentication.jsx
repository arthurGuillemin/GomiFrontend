import React, { useEffect, useState, useContext } from 'react';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import { signup, login as loginService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateSignupInput } from '../utils/dataValidation';
import styles from './Authentication.module.css';

const Authentication = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSignUpMobile, setIsSignUpMobile] = useState(false);

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [confirmSingupPassword , setConfirmSignupPassword] = useState('');

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
        setErrorMessage('');
        setSuccessMessage('');
        if (signupPassword !== confirmSingupPassword) {
            setErrorMessage('Le mot de passe et la confirmation ne sont pas identiques.');
            return;
        }

        const validation = validateSignupInput({
            email: signupEmail,
            password: signupPassword,
        });

        if (!validation.isValid) {
            setErrorMessage(validation.message);
            return;
        }

        try {
            await signup({ username, email: signupEmail, password: signupPassword });
            setSuccessMessage("Votre compte a bien été créé !");
            setUsername('');
            setSignupEmail('');
            setSignupPassword('');
            setConfirmSignupPassword('');
            if (isMobile) setIsSignUpMobile(false);
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
    };

    const handleLogin = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!loginEmail || !loginPassword) {
            setErrorMessage('Email et mot de passe requis pour se connecter.');
            return;
        }

        try {
            const data = await loginService({ email: loginEmail, password: loginPassword });
            login({ token: data.token, user_id: data.user_id, email: data.email, username: data.username });
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Identifiants incorrects ou utilisateur non trouvé.");
        }
    };

    if (isAuthenticated) {
        navigate('/');
    }

    return (
       <div className={styles.authContainer}>
            {!isMobile && <h1 className={styles.authTitle}>Rejoignez-nous</h1>}

            <div className={styles.authContent}>
                {!isMobile && (
                    <>
                        <div  className={`${styles.formContainer} ${styles.left}`}>
                            <h2 className={styles.subtitle}>Créez votre compte</h2>
                            <InputField label="Pseudo" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputField label="Email" placeholder="example@domain.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                            <InputField label="Mot de passe" type="password" isPassword placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                            <InputField label="Confirmation du mot de passe" type="password" isPassword placeholder="••••••••" value={confirmSingupPassword} onChange={(e) => setConfirmSignupPassword(e.target.value)} />
                            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                            {successMessage && <p className={styles.successText}>{successMessage}</p>}
                            <div className={styles.buttonWrapper}>
                                <Button label="S'inscrire" onClick={handleSignup} />
                            </div>
                        </div>
                        <div className={styles.separator} />
                    </>
                )}

                {(!isMobile || !isSignUpMobile) && (
                    <div className={`${styles.formContainer} ${styles.right}`}>
                        <h2 className={styles.subtitle}>Connectez-vous</h2>
                        <InputField label="Email" placeholder="example@domain.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        <InputField label="Mot de passe" type="password" isPassword placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                        <div className={styles.buttonWrapper}>
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
                    <div className={`${styles.formContainer} ${styles.left}`}>
                        <h2 className={styles.subtitle}>Créez votre compte</h2>
                        <InputField label="Pseudo" placeholder="Pseudo" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <InputField label="Email" placeholder="Votre email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                        <InputField label="Mot de passe" type="password" isPassword placeholder="********" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                        <InputField label="Confirmation du mot de passe" type="password" isPassword placeholder="********" value={confirmSingupPassword} onChange={(e) => setConfirmSignupPassword(e.target.value)} />
                        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                        {successMessage && <p className={styles.successText}>{successMessage}</p>}
                        <div className={styles.buttonWrapper}>
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

            <div className={styles.authIllustration}>
                <img
                    src="/Together-cuate.svg"
                    alt="Illustration"
                    style={{
                        width: isMobile ? '250px' : '300px',
                        backgroundColor: 'transparent',
                        transform: isMobile ? 'none' : 'translateX(300px)',
                    }}
                    />

            </div>
        </div>
    );
};



export default Authentication;
