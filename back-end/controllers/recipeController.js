// controllers/recipeController.js
const Recipe = require('../models/Recipe');

// Create a new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisineType } = req.body;

  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    cuisineType,
    author: req.user._id,
  });

  const createdRecipe = await recipe.save();
  res.status(201).json(createdRecipe);
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).populate('author', 'username');
  res.json(recipes);
};

// Get recipe by ID
const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisineType } = req.body;

  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cuisineType = cuisineType || recipe.cuisineType;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await recipe.remove();
    res.json({ message: 'Recipe removed' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
