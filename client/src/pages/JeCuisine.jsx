import React, { useState } from 'react';
import FoodieGirly from '/foodieGirly.svg';
import { generateRecipesFromImage } from '../services/recipeGenerator';
import '../assets/global.css';
import { FiSearch } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const JeCuisine = () => {
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recette, setRecette] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setIngredients([]);
    setRecette("");
  };

  const handleGenerate = async () => {
    if (!image) return alert("Veuillez sélectionner une image.");
    setLoading(true);

    try {
      const result = await generateRecipesFromImage(image);

      const cleanedIngredients = Array.isArray(result.ingredients)
        ? result.ingredients.map(i => i.trim())
        : String(result.ingredients)
            .replace(/[\[\]']+/g, '')
            .split(',')
            .map(i => i.trim())
            .filter(Boolean);

      setIngredients(cleanedIngredients);
      setRecette(result.recette);
    } catch (err) {
      alert("Erreur pendant la génération de la recette.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <article className='jeCuisineHome'>
        <section>
          <div>
            <h1>Je cuisine</h1>
            <p>
              Prenez une photo de l’intérieur de votre frigo et découvrez automatiquement les ingrédients détectés.
              Une façon simple et rapide de garder un œil sur ce que vous avez, éviter le gaspillage et trouver des
              idées de recettes adaptées à ce que vous avez sous la main !
            </p>
          </div>

          <div className="searchContainer">
            <input
              type="text"
              placeholder="Rechercher mon frigo..."
              className="searchInput"
            />
            <button className="searchButton">
              <FiSearch size={20} />
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleGenerate} disabled={loading} style={{ marginLeft: '1rem' }}>
              {loading ? "Génération..." : "Générer une recette"}
            </button>
          </div>

          {ingredients.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h2>🧾 Ingrédients détectés :</h2>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>• {item}</li>
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
