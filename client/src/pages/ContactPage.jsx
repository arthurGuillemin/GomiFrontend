import React, { useEffect, useState , useContext } from 'react';
import contactIllustration from '/contact.svg';
import styles from './contact.module.css'
const ContactPage = () => {
  return (
    <>
    <div className={styles['fade-in-up']}>
<div className={styles.page}>
  <img src={contactIllustration} alt="Contact" className={styles.image} />
  <div className={styles.content}>
    <a href="https://github.com/yelineeee" className={styles['contact-link']}>
      <h1 className={styles.title}>Kelly Goncalves Gama - Développeuse react</h1>
    </a>
    <a href="https://github.com/arthurGuillemin" className={styles['contact-link']}>
      <h1 className={styles.title}>Arthur Guillemin - Développeur Fullstack</h1>
    </a>
    <a href="https://github.com/gladiaaa" className={styles['contact-link']}>
      <h1 className={styles.title}>Ryan Annic - Développeur Fullstack</h1>
    </a>
    <a href="https://github.com/emilie-caverne" className={styles['contact-link']}>
      <h1 className={styles.title}>Emilie Caverne - Développeuse react</h1>
    </a>
  </div>
</div>
    </div>
</>
  );
};

export default ContactPage;
