import React, { useEffect, useState , useContext } from 'react';
import eatingWoman from '/eating-woman.svg';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
  
      useEffect(() => {
      if (!isAuthenticated) {
        navigate('/auth');
      }
    }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Omelette gourmande</h1>

      <section >
        <h2 style={styles.subTitle}>Ingrédients :</h2>
        <ul style={styles.list}>
          <li>3 œufs</li>
          <li>1 demi-oignon</li>
          <li>1 petit morceau de poivron</li>
          <li>1 poignée de champignons</li>
          <li>30 g de fromage râpé (emmental, comté, etc.)</li>
          <li>Sel, poivre, un peu d’huile ou de beurre</li>
        </ul>
      </section>

      <section >
        <h2 style={styles.subTitle}>Préparation :</h2>
        <ol style={styles.list}>
          <li><strong>Préparez les ingrédients</strong><br /> Émincez l’oignon, les poivrons et les champignons. Coupez le jambon ou le poulet en petits morceaux.</li>
          <li><strong>Faites revenir à la poêle</strong><br /> Dans une poêle chaude avec un peu d’huile ou de beurre, faites revenir les légumes pendant 5 minutes. Ajoutez ensuite le jambon ou le poulet pour les réchauffer.</li>
          <li><strong>Ajoutez les œufs battus</strong><br /> Battez les œufs dans un bol avec du sel et du poivre. Versez-les dans la poêle, par-dessus la garniture, et baissez un peu le feu.</li>
          <li><strong>Ajoutez le fromage et laissez cuire</strong><br /> Saupoudrez de fromage râpé. Couvrez la poêle et laissez cuire doucement jusqu’à ce que l’omelette soit prise mais encore moelleuse.</li>
        </ol>
      </section>

      <div>
        <img
          src={eatingWoman}
          alt="Illustration"
          style={isMobile ? styles.illustrationMobile : styles.illustration}
        />
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '50px',
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
  },
  title: {
    color: '#FFC700',
    fontSize: '32px',
    marginBottom: '20px',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  subTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: "'Josefin Sans', sans-serif",
  },
  list: {
    paddingLeft: '20px',
    lineHeight: '1.6',
  },
  illustration: {
    position: 'absolute',
    bottom: -40,
    right: '-160px',
    width: '300px',
  },
  illustrationMobile: {
    position: 'static',
    display: 'block',
    margin: '30px auto 0',
    width: '70%',
    maxWidth: '300px',
  },
};

export default RecipePage;