import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import profileIllustration from '/profile.svg';
import { AuthContext } from '../context/AuthContext';
import { updateUserdata } from '../services/userService';

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { logout, user, token } = useContext(AuthContext);
    const navigate = useNavigate();
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
    try {
        const updatedUser = await updateUserdata(user.id, token, {
            username,
            email
        });
        alert('Profil mis à jour avec succès !');
        console.log(updatedUser);
    } catch (error) {
        alert("Erreur lors de la mise à jour du profil");
        console.error(error);
    }};

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
    };

    return (
        <div style={styles.page}>
            <img src={profileIllustration} alt="Illustration profil" style={styles.image} />
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Profil</h1>
                <InputField label="Pseudo" placeholder={user?.username || 'Votre pseudo'} value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputField label="Email" placeholder={user?.email || 'Votre email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                <div style={styles.buttonWrapper}>
                    <Button label="Sauvegarder" onClick={handleSave}/>
                    <Button
                        label="Déconnexion"
                        variant="outlined"
                        onClick={handleLogout}
                        customStyle={{
                            border: '1px solid #e63946',
                            color: '#e63946',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
