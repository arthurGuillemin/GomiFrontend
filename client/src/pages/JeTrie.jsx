
import React, {useContext , useEffect } from 'react';
import TrashyFriends from '../assets/trashyFriends.svg';
import '../assets/global.css';
import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const JeTrie = () => {
    const { isAuthenticated } = useContext(AuthContext);
      const navigate = useNavigate();
    
        useEffect(() => {
        if (!isAuthenticated) {
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
                <div className="searchContainer jeTrie">
                    <input
                        type="text"
                        placeholder="Rechercher un déchet..."
                        className="searchInput"
                        />
                    <button className="searchButton">
                    <FiSearch size={20} />
                    </button>
                </div>
            </section>
            <section>
                <img src={TrashyFriends}  />
            </section>
        </article>
    </div>
    
  );
};

export default JeTrie;
