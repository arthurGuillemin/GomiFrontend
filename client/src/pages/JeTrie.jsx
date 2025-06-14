import { useState, useRef } from 'react';
import '../assets/global.css';
import styles from './trie.module.css'
import TrashyFriends from '/trashyFriends.svg';


import TrashPopup from '../components/TrashResult/TrashPopup.jsx';
import { classifyWasteImage } from '../services/gradioTrashService';
import ImageSearch from '../components/imageSearch.jsx';

const JeTrie = () => {

  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popupData, setPopupData] = useState(null);
  const [useFullPage, setUseFullPage] = useState(false);
  const imageSearchRef = useRef();



const translateMaterial = (mat) => {
  switch (mat.toLowerCase()) {
    case 'paper':
    case 'papier':
    case 'cardboard':
    case 'papier/carton':
      return 'papier / carton';
    case 'glass':
    case 'verre':
      return 'verre';
    case 'plastic':
    case 'plastique':
      return 'plastique';
    case 'metal':
    case 'métal':
      return 'métal';
    case 'organic':
    case 'compost':
    case 'bio':
      return 'déchets organiques';
    case 'trash':
    case 'ordures ménagères':
    case 'residual':
      return 'ordures ménagères';
    default:
      return mat;
  }
};

const materialToColor = (material) => {
  switch (material.toLowerCase()) {
    case 'papier':
      return 'jaune';
    case 'carton':
      return 'jaune';
    case 'papier / carton':
      return 'jaune';
    case 'plastique':
      return 'jaune';
    case 'métal':
      return 'jaune';
    case 'verre':
      return 'verte';
    case 'déchets organiques':
      return 'verte';
    case 'ordures ménagères':
    case 'trash':
      return 'grise';
    default:
      return 'verte';
  }
};


const  displayPreview =(file) =>{
      setPreviewUrl(URL.createObjectURL(file));
};

  const handleSend = async (file) => {
    setLoading(true);
    setError('');
    setPopupData(null);

  try {
    const data = await classifyWasteImage(file);
    if (data.length > 0) {
      const { poubelle: rawMaterial } = data[0];
      const materialFr = translateMaterial(rawMaterial);
      const color      = materialToColor(materialFr);
      setPopupData({ trashName: materialFr,  color });
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
    if (imageSearchRef.current) {
      imageSearchRef.current.reset();
    }
  };

 

  return (
    <div>
      <article className= {`${styles['jeTrieHome']} ${styles['fade-in-up']}`}>
        <section>
          <div className={styles}>
            <h1 className={styles['title-page']}>Je trie</h1>
            <p>
              Prenez une photo de votre déchet pour savoir instantanément dans quelle
              poubelle il doit aller. Verre, plastique, compost ou ordures : l’appli vous
              guide pour trier facilement et correctement, réduire votre impact sur
              l’environnement et adopter les bons gestes au quotidien.
            </p>
          </div>

          <ImageSearch  ref={imageSearchRef} onSend={handleSend} onImageSelected={displayPreview} variant="trie"  />

          {previewUrl && (
            <div className={styles['preview-container']}>
              <img
                src={previewUrl}
                alt="Aperçu du déchet"
                className={styles['preview-image']}
              />
              <button className={styles['close-preview-button']} onClick={resetPreview}>×</button>
            </div>
          )}

          {loading && <p className={styles['loadingText']}>Analyse en cours...</p>}
          {error && <p className="errorText">{error}</p>}
        </section>
        <section className={styles['fade-in-up']}>
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