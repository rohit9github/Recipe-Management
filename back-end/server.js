// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const RecipeController = require('./controllers/RecipeController');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipeMangement', { useNewUrlParser: true, useUnifiedTopology: true })

router.get('/recipes', RecipeController.getRecipes);


app.use('/api/auth', authRoutes);
app.use('/api/aut/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
