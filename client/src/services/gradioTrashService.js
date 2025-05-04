import { Client } from "@gradio/client";

const clientPromise = Client.connect("ankz22/trash-classifier");

export async function classifyWasteImage(imageFile) {
  const client = await clientPromise;
  const response = await client.predict("/predict", { image: imageFile });
  const rawData = response.data?.[0]?.data;

  if (!rawData || !Array.isArray(rawData)) {
    throw new Error("mauvais format de reponse");
  }
  return rawData.map(([objet, poubelle, confiancePourcent]) => ({
    objet,
    poubelle,
    confiance: confiancePourcent,
  }));
}
