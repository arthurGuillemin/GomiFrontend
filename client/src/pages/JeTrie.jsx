import React, { useContext, useEffect, useState } from 'react';
import '../assets/global.css';
import TrashyFriends from '/trashyFriends.svg';

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ImageSearch from '../components/ImageSearch.jsx';
import TrashPopup from '../components/TrashResult/TrashPopup.jsx';
import TrashFullPage from '../components/TrashResult/TrashFullPage.jsx';
import { classifyWasteImage } from '../services/gradioTrashService';

const JeTrie = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupData, setPopupData] = useState(null);
  const [useFullPage, setUseFullPage] = useState(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === undefined) return null;

  const materialToColor = (material) => {
    switch (material) {
      case 'papier/carton':
      case 'papier':
        return 'jaune';
      case 'verre':
        return 'verte';
      case 'plastique':
        return 'jaune';
      case 'métal':
        return 'jaune';
      case 'ordures ménagères':
        return 'grise';
      default:
        return 'grise';
    }
  };

  const handleSend = async (file) => {
    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);
    setError('');
    setPopupData(null);

    try {
      const data = await classifyWasteImage(file);
      if (data.length > 0) {
        const { objet, poubelle: material } = data[0];
        const color = materialToColor(material);
        setPopupData({ trashName: objet, color });
      } else {
        setError("Aucun résultat détecté.");
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la classification.');
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopupData(null);
    setUseFullPage(false);
  };

  const resetPreview = () => {
    setPreviewUrl('');
    setPopupData(null);
    setError('');
  };

  return (
    <div>
      <article className="jeTrieHome">
        <section>
          <div>
            <h1>Je trie</h1>
            <p>
              Prenez une photo de votre déchet pour savoir instantanément dans quelle
              poubelle il doit aller. Verre, plastique, compost ou ordures : l’appli vous
              guide pour trier facilement et correctement, réduire votre impact sur
              l’environnement et adopter les bons gestes au quotidien.
            </p>
          </div>

          <ImageSearch onSend={handleSend} />

          {previewUrl && (
            <div className="preview-container">
              <img
                src={previewUrl}
                alt="Aperçu du déchet"
                className="preview-image"
              />
              <button className="close-preview-button" onClick={resetPreview}>×</button>
            </div>
          )}

          {loading && <p className="loadingText">Analyse en cours...</p>}
          {error && <p className="errorText">{error}</p>}
        </section>
        <section>
          <img src={TrashyFriends}  />
        </section>
      </article>

      {popupData && !useFullPage && (
        <TrashPopup
          trashName={popupData.trashName}
          color={popupData.color}
          onClose={closePopup}
        />
      )}

      {popupData && useFullPage && (
        <TrashFullPage
          trashName={popupData.trashName}
          color={popupData.color}
        />
      )}
    </div>
  );
};

export default JeTrie;