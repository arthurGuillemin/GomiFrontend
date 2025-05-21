import React, {useContext , useEffect } from 'react';
import FoodieGirly from '/foodieGirly.svg';
import '../assets/global.css';
import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ImageSearch from '../components/imageSearch.jsx';

const JeCuisine = () => {
      const { isAuthenticated } = useContext(AuthContext);
      const navigate = useNavigate();
    
        useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/auth');
        }
      }, [isAuthenticated, navigate]);
  return (
    <div>
        <article  className='jeCuisineHome'>
             <section>
                <div>
                    <h1>Je cuisine</h1>
                    <p>Prenez une photo de l’intérieur de votre frigo et découvrez automatiquement les ingrédients détectés. Une façon simple et rapide de garder un œil sur ce que vous avez, éviter le gaspillage et trouver des idées de recettes adaptées à ce que vous avez sous la main !</p>
                </div>
                <ImageSearch />
            </section>
            <section>
                <img src={FoodieGirly}  />
            </section>
        </article>
    </div>
    
  );
};

export default JeCuisine;
