import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Calls
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Assuming your backend responds with user data
    } catch (error) {
      throw error; // Re-throw the error to handle it in Register.js
    }
  }

export const loginUser = async (userData) => {
  return await api.post('/auth/login', userData);
};

export const getRecipes = async (token) => {
    const response = await axios.get('http://localhost:5000/api/recipes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

export const createRecipe = async (recipeData, token) => {
  return await api.post('/recipes', recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRecipe = async (id, recipeData, token) => {
  return await api.put(`/recipes/${id}`, recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRecipe = async (id, token) => {
  return await api.delete(`/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
