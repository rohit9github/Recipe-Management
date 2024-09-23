import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import RecipeForm from './components/RecipeForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes/:id" element={<RecipePage />} />
                <Route path="/create" element={<RecipeForm />} />
            </Routes>
        </Router>
    );
};

export default App;
