import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`/recipes/${id}`);
                setRecipe(res.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold">{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Cuisine Type:</strong> {recipe.cuisineType}</p>
            <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            <button onClick={handleDelete} className="bg-red-500 text-white p-2">Delete Recipe</button>
        </div>
    );
};

export default RecipeDetail;
