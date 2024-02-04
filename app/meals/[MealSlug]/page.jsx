import React from 'react';
import Link from 'next/link';

const MealsPage = () => {
    return (
        <main>
            <p className='Link'>
                <Link href='/meal-1'>Meal 1</Link>
            </p>
        </main>
    );
};

export default MealsPage;
