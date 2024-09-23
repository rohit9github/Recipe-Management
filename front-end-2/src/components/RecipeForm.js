import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ recipe }) => {
    const [title, setTitle] = useState(recipe ? recipe.title : '');
    const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients.join(', ') : '');
    const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
    const [cuisineType, setCuisineType] = useState(recipe ? recipe.cuisineType : '');
    const [cookingTime, setCookingTime] = useState(recipe ? recipe.cookingTime : '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = { title, ingredients: ingredients.split(','), instructions, cuisineType, cookingTime };
    
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please login first.');
            return;
        }

        try {
            if (recipe) {
                await axios.put(`/recipes/${recipe._id}`, newRecipe, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post('/recipes', newRecipe, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" required />
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required></textarea>
            <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} placeholder="Cuisine Type" required />
            <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} placeholder="Cooking Time (in minutes)" required />
            <button type="submit">Save Recipe</button>
        </form>
    );
};

export default RecipeForm;
