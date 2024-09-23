// routes/recipeRoutes.js
const express = require('express');

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createRecipe)
  .get(getAllRecipes);

router.route('/:id')
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

  router.get('/', (req, res) => {
    res.send('Get all recipes');
});

module.exports = router;
