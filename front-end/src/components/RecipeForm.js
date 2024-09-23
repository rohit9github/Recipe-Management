// src/components/RecipeForm.js
import React, { useState } from 'react';
import { createRecipe } from '../api/api';

const RecipeForm = ({ token }) => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
  });

  const handleChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRecipe(recipeData, token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={recipeData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={recipeData.ingredients}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instructions"
        placeholder="Instructions"
        value={recipeData.instructions}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cuisineType"
        placeholder="Cuisine Type"
        value={recipeData.cuisineType}
        onChange={handleChange}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
