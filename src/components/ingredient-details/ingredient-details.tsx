import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsLoading
} from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(getIngredients);
  const isLoading = useSelector(getIngredientsLoading);

  const ingredientData = useMemo(() => {
    if (!id || !ingredients.length) return null;
    return ingredients.find((ingredient) => ingredient._id === id) || null;
  }, [id, ingredients]);

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
