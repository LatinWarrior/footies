import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'use-east-1',
});

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

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // To make sure that you don't accidentally override other images
    // with the same file name, consider adding some random unique
    // element to each filename.
    // const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    // stream.write(Buffer.from(bufferedImage), (error) => {
    //     if (error) {
    //         throw new Error('Savings image failed.');
    //     }
    // });

    s3.putObject({
        Bucket: 'lb-nextjs-demo-users-images',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    // meal.image = `/images/${fileName}`;
    meal.image = fileName;

    db.prepare(
        `
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `
    ).run(meal);
}
