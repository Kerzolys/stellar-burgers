import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { modalSelector } from '../../features/modalSlice';
import { TIngredient } from '@utils-types';
import {
  burgerIngredientsSelector
  // selectIngredientById
} from '../../features/burgerIngredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  // const { id } = useParams<{ id: string }>();
  const { selected, type } = useSelector(modalSelector);
  // const dispatch = useDispatch();

  if (!selected || type !== 'ingredient') {
    return <Preloader />;
  }

  // if (selected && type === 'ingredient') {
  //   const ingredient = selected as TIngredient;
  //   return <IngredientDetailsUI ingredientData={ingredient} />;
  // }

  // const ingredient = useSelector((state) => selectIngredientById(state, id));
  // console.log(ingredient)

  // if (!ingredient) {
  //   return <Preloader />;
  // }

  const ingredient = selected as TIngredient;

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
