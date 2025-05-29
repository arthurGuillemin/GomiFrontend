import zxcvbn from 'zxcvbn';

export const validateSignupInput = ({ email, password }) => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return {
      isValid: false,
      message: "Email invalide.",
    };
  }
  try {
    const result = zxcvbn(password);
    const score = result.score;
    const reason = result.feedback.warning;

    if (score < 2) {
      return {
        isValid: false,
        message: `Mot de passe trop faible : ${reason}`,
      };
    }
    return { isValid: true };
  } catch (error) {
    console.error(`Erreur pdt la vérification du mdp : ${error}`);
    return {
      isValid: false,
      message: "Erreur dans la validation du mot de passe.",
    };
  }
};
