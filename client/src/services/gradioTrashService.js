import { Client } from "@gradio/client";

const clientPromise = Client.connect("ankz22/trash-classifier");

export async function classifyWasteImage(imageFile) {
  const client = await clientPromise;
  const response = await client.predict("/predict", { image: imageFile });
  const data = response.data[0].data;

  const classification = data.map(([objet, poubelle, confiancePourcent]) => ({
    objet,
    poubelle,
    confiance: confiancePourcent,
  }));

  return classification;
}
