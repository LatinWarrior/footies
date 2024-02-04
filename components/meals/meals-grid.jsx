import MealItem from './meal-item';
import classes from './meals.module.css';

const MealsGrid = ({ meals }) => {
    return (
        <ul className={classes.meals}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsGrid;
