const express = require('express');
const { createRecipe, getRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/', authMiddleware, createRecipe);
router.get('/', getRecipes); // Public route to get all recipes
router.put('/:id', authMiddleware, updateRecipe); // Protected update route
router.delete('/:id', authMiddleware, deleteRecipe); // Protected delete route

module.exports = router;
