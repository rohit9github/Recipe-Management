const Recipe = require('../models/Recipe');

// Create Recipe
exports.createRecipe = async (req, res) => {
    const recipe = new Recipe({ ...req.body, author: req.user.id });
    try {
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read Recipes
exports.getRecipes = async (req, res) => {
    const recipes = await Recipe.find().populate('author', 'username');
    res.json(recipes);
};

// Update Recipe
exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Recipe
exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
