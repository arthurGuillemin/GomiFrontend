import axios from 'axios';

export async function generateRecipesFromImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post("http://localhost:5050/recette", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { ingredients, recette } = response.data;

    if (!ingredients || !recette) {
      throw new Error("Réponse incomplète ou invalide depuis le serveur");
    }

    return {
      ingredients,
      recette: typeof recette === "string" ? recette.trim() : recette
    };
  } catch (error) {
    console.error("Erreur axios :", error.response?.data || error.message);
    throw new Error("Erreur pendant la génération de la recette.");
  }
}
