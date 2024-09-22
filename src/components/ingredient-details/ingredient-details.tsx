import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { modalSelector } from '../../features/modalSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { selected, type } = useSelector(modalSelector);

  if (!selected || type !== 'ingredient') {
    return <Preloader />;
  }

  const ingredient = selected as TIngredient;

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
