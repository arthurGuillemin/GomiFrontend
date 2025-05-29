import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodieGirly from '/foodieGirly.svg';
import '../assets/global.css';
import ReactMarkdown from 'react-markdown';

import { AuthContext } from '../context/AuthContext';
import ImageSearch from '../components/imageSearch.jsx';
import { generateRecipesFromImage } from '../services/recipeGenerator';

const JeCuisine = () => {
  const imageSearchRef = useRef();
  const [previewUrl, setPreviewUrl] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recette, setRecette] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSend = async (file) => {
    setPreviewUrl(URL.createObjectURL(file));
    setIngredients([]);
    setRecette('');
    setError('');
    setLoading(true);

    try {
      const result = await generateRecipesFromImage(file);
      const cleaned = Array.isArray(result.ingredients)
        ? result.ingredients.map(i => i.trim())
        : String(result.ingredients)
            .replace(/[\[\]']+/g, '')
            .split(',')
            .map(i => i.trim())
            .filter(Boolean);

      setIngredients(cleaned);
      setRecette(result.recette);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la génération de la recette.');
    } finally {
      setLoading(false);
    }
  };

  const resetPreview = () => {
    setPreviewUrl('');
    setIngredients([]);
    setRecette('');
    setError('');
    if (imageSearchRef.current) imageSearchRef.current.reset();
  };

  return (
    <div>
      <article className="jeCuisineHome fade-in-up">
        <section>
          <div>
            <h1>Je cuisine</h1>
            <p>
              Prenez une photo de l’intérieur de votre frigo et découvrez automatiquement les ingrédients détectés. Une façon simple et rapide de garder un œil sur ce que vous avez, éviter le gaspillage et trouver des idées de recettes adaptées à ce que vous avez sous la main !
            </p>
          </div>

          <ImageSearch ref={imageSearchRef} onSend={handleSend} />
          {previewUrl && (
            <div className="preview-container">
              <img src={previewUrl} alt="Aperçu du frigo" className="preview-image" />
              <button className="close-preview-button" onClick={resetPreview}>×</button>
            </div>
          )}

          {loading && <p className="loadingText">Génération en cours...</p>}
          {error && <p className="errorText">{error}</p>}

          {ingredients.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h2>🧾 Ingrédients détectés :</h2>
              <ul>
                {ingredients.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {recette && (
            <div style={{ marginTop: '1.5rem' }}>
              <h2>🍽️ Recette générée :</h2>
              <div style={{ background: '#f9f9f9', padding: '1rem' }}>
                <ReactMarkdown>{recette}</ReactMarkdown>
              </div>
            </div>
          )}
        </section>

        <section>
          <img src={FoodieGirly} alt="illustration" />
        </section>
      </article>
    </div>
  );
};

export default JeCuisine;


