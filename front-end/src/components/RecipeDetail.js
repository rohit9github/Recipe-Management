// src/components/RecipeDetail.js
import React from 'react';

const RecipeDetail = ({ recipe, onEdit, onDelete }) => {
  if (!recipe) {
    return <p className="p-4">Select a recipe to view its details.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Cuisine:</strong> {recipe.cuisineType}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime} mins</p>

      <div className="mt-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => onEdit(recipe)}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => onDelete(recipe.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
