import React from 'react';
import contactIllustration from '../../public/contact.svg';

const ContactPage = () => {
    return (
        <div style={styles.page}>
            <img src={contactIllustration} alt="Contact" style={styles.image} />

            <div style={styles.content}>
                <h1 style={styles.title}>Kelly Goncalves Gama</h1>
                <h1 style={styles.title}>Arthur Guillemin</h1>
                <h1 style={styles.title}>Rayan</h1>
                <h1 style={styles.title}>Saad</h1>
                <h1 style={styles.title}>Emilie Caverne</h1>
            </div>
        </div>
    );
};

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'row',
        padding: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',

    },
    image: {
        maxWidth: '800px',
        width: '100%',
    },
    content: {
        maxWidth: '400px',
        textAlign: 'left',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        fontFamily: "'Josefin Sans', sans-serif",
        marginBottom: '10px',
    },
};

export default ContactPage;
