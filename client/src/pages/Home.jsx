
import React from 'react';
import { Link } from 'react-router-dom'; 
import EarthGirl from '../assets/earthGirl.svg';
import TrashyFriends from '../assets/trashyFriends.svg';
import FoodieGirly from '../assets/foodieGirly.svg';
import '../assets/global.css';


const Home = () => {
  return (
    <div>
      <article className='mainHome'>
        <section>
            <h1>Trier. Reduire.</h1>
            <h1>Respecter.</h1>
            <p>Gomi vous aide à transformer chaque reste et chaque tri en un geste utile pour la planète.</p>
            <button>Commencer</button>
        </section>
        <section>
            <img src={EarthGirl}  />
        </section>
      </article>   
      <article className='jeTrieHome'>
        <section>
            <h1>Je trie</h1>
            <p>Prenez une photo de votre déchet pour savoir instantanément dans quelle poubelle il doit aller. Verre, plastique, compost ou ordures : l’appli vous guide pour trier facilement et correctement, réduire votre impact sur l’environnement et adopter les bons gestes au quotidien.</p>
            <Link to="/je-trie">
              <button>Essayer →</button>
            </Link>
        </section>
        <section>
            <img src={TrashyFriends}  />
        </section>
      </article>
      <article className='jeCuisineHome'>
        <section>
            <h1>Je cuisine</h1>
            <p>Prenez une photo de l’intérieur de votre frigo et découvrez automatiquement les ingrédients détectés. Une façon simple et rapide de garder un œil sur ce que vous avez, éviter le gaspillage et trouver des idées de recettes adaptées à ce que vous avez sous la main !</p>
            <Link to="/je-cuisine">
              <button>Essayer →</button>
            </Link>
        </section>
        <section>
            <img src={FoodieGirly}  />
        </section>
      </article>
    </div>
    
  );
};

export default Home;
