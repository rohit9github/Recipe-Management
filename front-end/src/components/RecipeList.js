import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api/api';

const RecipeList = ({ token }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(token);
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
       
        <h1>Recipe List</h1>
        <ul>
            {Array.isArray(recipes) && recipes.length > 0 ? (
                recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.name}</li> // Adjust according to your recipe structure
                ))
            ) : (
                <p>No recipes found.</p> // Display a message if there are no recipes
            )}
        </ul>
    </div>
);

};

export default RecipeList;
