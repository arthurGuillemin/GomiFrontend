import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const getUserNameById = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/name`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error getting username :', error);
    throw error;
  }
};
