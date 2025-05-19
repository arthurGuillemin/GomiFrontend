import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signup = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || 'Erreur pdt inscription';
    throw new Error(message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || 'Erreur de connexion';
    throw new Error(message);
  }
};
