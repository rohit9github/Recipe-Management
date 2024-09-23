import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Login from './pages/Login';
import Register from './pages/Register';
import { getRecipes, deleteRecipe } from './api/api'; // Ensure this is imported

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [token, setToken] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (token) {
        const response = await getRecipes(token);
        setRecipes(response.data);
      }
    };
    fetchRecipes();
  }, [token]);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setEditing(false);
  };

  const handleRecipeSave = (newRecipe) => {
    if (newRecipe._id) {
      setRecipes(recipes.map((r) => (r._id === newRecipe._id ? newRecipe : r)));
    } else {
      setRecipes([...recipes, newRecipe]);
    }
    setSelectedRecipe(null);
  };

  const handleRecipeDelete = async (id) => {
    await deleteRecipe(id, token);
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
        </div>
        <div>
          {editing ? (
            <RecipeForm currentRecipe={selectedRecipe} onSave={handleRecipeSave} token={token} />
          ) : (
            <RecipeDetail recipe={selectedRecipe} onEdit={() => setEditing(true)} onDelete={handleRecipeDelete} />
          )}
          <Login setToken={setToken} />
          <Register />
        </div>
      </div>
    </div>
  );
};

export default App;
