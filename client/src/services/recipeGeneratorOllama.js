import axios from 'axios';

const API_URL = 'http://46.202.128.132:5050/recette';

export const sendImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const recipe = response.data.recette
    console.log(recipe);
    
    return recipe;
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’image :', error);
    throw error;
  }
};
