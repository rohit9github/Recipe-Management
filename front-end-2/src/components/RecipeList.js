import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get('/recipes'); // No need for '/api' in axios baseURL
                setRecipes(res.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold">Recipe List</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`} className="text-blue-500">
                            {recipe.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
