import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import profileIllustration from '/profile.svg';
import { AuthContext } from '../context/AuthContext';
import { updateUserdata , deleteUser } from '../services/userService';

const ProfilePage = () => {
    const { logout, update, user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [originalUsername, setOriginalUsername] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {                  
            setUsername(user.username || '');
            setEmail(user.email || '');
            setOriginalUsername(user.username || '');
            setOriginalEmail(user.email || '');
        }
    }, [user]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaChange = (e) => setIsMobile(e.matches);
        handleMediaChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const handleSave = async () => {
        setMessage('');
        const hasUsernameChanged = username !== originalUsername;
        const hasEmailChanged = email !== originalEmail;

        if (!hasUsernameChanged && !hasEmailChanged) {
            setMessage("Aucune modification détectée.");
            return;
        }

        try {
            const updatePayload = {};
            if (hasUsernameChanged) updatePayload.username = username;
            if (hasEmailChanged && email.trim() !== '') updatePayload.email = email;

            const updatedUser = await updateUserdata(user.id, token, updatePayload);
            update(updatePayload);
            setOriginalUsername(updatedUser.username || username);
            setOriginalEmail(updatedUser.email || email);
            setMessage("Profil mis à jour avec succès !");
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la mise à jour du profil.");
        }
    };

    const handleSupr= async()=>{
        try {
            const deletedUser = await deleteUser(user.id , token)
            handleLogout()
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la suppression du profil.");
        }

    }

    const styles = {
        page: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            gap: '50px',
        },
        image: {
            width: isMobile ? '200px' : '450px',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            fontSize: '28px',
            marginBottom: '30px',
            fontFamily: "'Josefin Sans', sans-serif",
            textAlign: 'center',
        },
        buttonWrapper: {
            marginTop: isMobile ? '-20px' : '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '0' : '10px',
            width: isMobile ? '100%' : 'auto',
            alignItems: 'center',
        },
        message: {
            marginTop: '15px',
            fontSize: '14px',
            color: message.includes("Erreur") ? '#e63946' : '#2a9d8f',
        },
    };

    return (
        <div className="fade-in-up" style={styles.page}>
            <img src={profileIllustration} alt="Illustration profil" style={styles.image} />
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Profil</h1>
                <InputField label="Pseudo" placeholder="Votre pseudo" value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputField label="Email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div style={styles.buttonWrapper}>
                    <Button label="Sauvegarder" onClick={handleSave} />
                    <Button
                        label="Déconnexion"
                        variant="outlined"
                        onClick={handleLogout}
                        customStyle={{
                            border: '1px solid #e63946',
                            color: '#e63946',
                        }}
                    />
                    <Button onClick={handleSupr} label="Supprimer son compte" variant="outlined" customStyle={{ border: '1px solid #e63946', color: '#e63946' }} />
                    {message && <div style={styles.message}>{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
