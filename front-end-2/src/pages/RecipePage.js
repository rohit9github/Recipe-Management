import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../components/RecipeDetail';
import RecipeForm from '../components/RecipeForm';

const RecipePage = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);

    return (
        <div>
            {isEditing ? <RecipeDetail id={id} /> : <RecipeForm />}
        </div>
    );
};

export default RecipePage;
