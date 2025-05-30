export const parseGeneratedRecipe = (rawText) => {
  const output = {
    title: "",
    ingredients: [],
    steps: []
  };

  const match = rawText.match(/###.*?recette générée\s*:\s*(.+)/i);
  if (!match) return output;

  const recipeText = match[1]
    .replace(/\s+/g, ' ')
    .replace(/ingredients:\s*ingredients:/i, 'ingredients:')
    .trim();

  const titleMatch = recipeText.match(/title:\s*(.*?)\s*ingredients:/i);
  if (titleMatch) {
    output.title = titleMatch[1].trim();
  }

  const ingredientsMatch = recipeText.match(/ingredients:\s*(.*?)\s*(recipe\s*)?directions:/i);
  if (ingredientsMatch) {
    const ingStr = ingredientsMatch[1].trim();
    const parts = ingStr.match(/(\d+\s+[^\d]+)/g);
    if (parts) {
      output.ingredients = parts.map(s => s.trim());
    } else {
      output.ingredients = ingStr.split(/(?=\d)/).map(s => s.trim()).filter(Boolean);
    }
  }

  const directionsMatch = recipeText.match(/directions:\s*(.+)$/i);
  if (directionsMatch) {
    const stepsStr = directionsMatch[1].trim();
    const allSteps = stepsStr
      .split(/\d+\.\s*/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !/^\d+$/.test(s))
      .map(s => s.endsWith('.') ? s : s + '.');

    output.steps = allSteps;
  }

  return output;
};
