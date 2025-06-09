import { Client } from "@gradio/client";
import { parseGeneratedRecipe } from '../utils/format';

const clientPromise = Client.connect("ankz22/Fridge_recipe_app2");

export async function generateRecipeFromImage(imageFile) {
  
  const client = await clientPromise;
  const response = await client.predict("/predict", {
    image: imageFile,
  });
  const rawText = response.data[0]; 
  const parsedRecipe = parseGeneratedRecipe(rawText);
  return {
    rawText,
    ...parsedRecipe, 
  };
}
