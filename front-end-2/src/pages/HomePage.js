import React from 'react';
import RecipeList from '../components/RecipeList';

const HomePage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Recipe Management</h1>
            <RecipeList />
        </div>
    );
};

export default HomePage;
