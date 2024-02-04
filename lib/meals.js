import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    // Add extra delay to simulate an asynchronous call
    // and then wrap the result in a promise.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error('Loading meals failed.');

    return db.prepare('SELECT * FROM meals').all();
}

// export async function getMeal(slug) {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     return db.prepare('SELECT * FROM meals  WHERE slug = ?').get(slug);
// }

// Do not return a promise in this case.
export function getMeal(slug) {    
    console.log(slug);
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
