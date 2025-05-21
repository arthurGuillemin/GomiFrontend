import React, {useContext , useEffect } from 'react';
import TrashyFriends from '/trashyFriends.svg';
import '../assets/global.css';
import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ImageSearch from '../components/imageSearch.jsx';

const JeTrie = () => {
    const { isAuthenticated } = useContext(AuthContext);
      const navigate = useNavigate();
    
        useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/auth');
        }
      }, [isAuthenticated, navigate]);
  return (
    <div>
        <article  className='jeTrieHome'>
             <section>
                <div>
                    <h1>Je trie</h1>
                    <p>Prenez une photo de votre déchet pour savoir instantanément dans quelle poubelle il doit aller. Verre, plastique, compost ou ordures : l’appli vous guide pour trier facilement et correctement, réduire votre impact sur l’environnement et adopter les bons gestes au quotidien.</p>
                </div>
                <ImageSearch />

            </section>
            <section>
                <img src={TrashyFriends}  />
            </section>
        </article>
    </div>
    
  );
};

export default JeTrie;
