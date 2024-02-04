'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

const isInvalidText = (text) => {
    return !text || text.trim() === '';
};

// Create a server-action function,
// which only executes on the server.
const shareMeal = async (formData) => {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    // Validate data.
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        isInvalidText(meal.title) ||
        !meal.creator_email.includes('@') ||
        !meal.imag ||
        meal.image.size === 0
    ) {
        throw new Error('Invalid input');
    }

    // console.log(meal);
    // Save the meal to the database.
    await saveMeal(meal);
    redirect('/meals');
};

export default shareMeal;
