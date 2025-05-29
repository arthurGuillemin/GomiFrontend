import { Client } from "@gradio/client";

const clientPromise = Client.connect("ankz22/Fridge_recipe_app");

export async function generateRecipeFromImage(imageFile) {
  const client = await clientPromise;
  const response = await client.predict("/predict", {
    image: imageFile,
  });
  const recipe = response.data[0];
  
  return {
    recipe,
  };
}
