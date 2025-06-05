import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Auth/InputField';
import Button from '../components/Auth/Button';
import profileIllustration from '/profile.svg';
import { AuthContext } from '../context/AuthContext';
import { updateUserdata, deleteUser } from '../services/userService';
import styles from './profile.module.css';

const ProfilePage = () => {
  const { logout, update, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [originalUsername, setOriginalUsername] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setOriginalUsername(user.username || '');
      setOriginalEmail(user.email || '');
    }
  }, [user]);


  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleSave = async () => {
    setMessage('');
    const hasUsernameChanged = username !== originalUsername;
    const hasEmailChanged = email !== originalEmail;

    if (!hasUsernameChanged && !hasEmailChanged) {
      setMessage('Aucune modification détectée.');
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
      setMessage('Profil mis à jour avec succès !');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la mise à jour du profil.');
    }
  };

  const handleSupr = async () => {
    try {
      await deleteUser(user.id, token);
      handleLogout();
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la suppression du profil.');
    }
  };

  return (
    <div className={`fade-in-up ${styles.page}`}>
      <img
        src={profileIllustration}
        alt="Illustration profil"
        className={styles.image}
      />

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Profil</h1>

        <InputField
          label="Pseudo"
          placeholder="Votre pseudo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={styles.buttonWrapper}>
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
          <Button
            onClick={handleSupr}
            label="Supprimer son compte"
            variant="outlined"
            customStyle={{
              border: '1px solid #e63946',
              color: '#e63946',
            }}
          />
          {message && (
            <div
              className={`${styles.message} ${
                message.includes('Erreur') ? styles.error : styles.success
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
