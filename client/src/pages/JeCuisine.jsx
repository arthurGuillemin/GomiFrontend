import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodieGirly from '/foodieGirly.svg';
import '../assets/global.css';
import ReactMarkdown from 'react-markdown';

import { AuthContext } from '../context/AuthContext';
import ImageSearch from '../components/imageSearch.jsx';
import { generateRecipeFromImage } from '../services/recipeGenerator';

const JeCuisine = () => {
  const imageSearchRef = useRef();
  const [previewUrl, setPreviewUrl] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


const handleSend = async (file) => {
  setPreviewUrl(URL.createObjectURL(file));
  setIngredients([]);
  setRecette(null);
  setError('');
  setLoading(true);

  try {
    const result = await generateRecipeFromImage(file);

    setIngredients(result.ingredients || []);
    setRecette({
      title: result.title,
      steps: result.steps,
    });
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
              <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc', lineHeight: '1.8' }}>
                {ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}


          {recette && (
            <div style={{ marginTop: '1.5rem' }}>
              <h2>🍽️ Recette générée :</h2>
              <h3 style={{ marginTop: '1rem', color: '#4caf50' }}>{recette.title}</h3>

              <h4>📝 Étapes :</h4>
              <ol style={{
                background: '#f9f9f9',
                padding: '1rem',
                borderRadius: '10px',
                listStylePosition: 'inside',
                lineHeight: '1.6',
              }}>
                {recette.steps
                  .filter(step => !/^\d+\.?$/.test(step.trim()))
                  .map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </li>
                  ))}
              </ol>
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


