import React, { FC, SyntheticEvent, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { useDispatch } from '../../../services/store';
import { openModal } from '../../../features/modal/modalSlice';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id } = ingredient;
    const dispatch = useDispatch();

    const openModalHandler = (evt: SyntheticEvent) => {
      dispatch(openModal({ item: ingredient, type: 'ingredient' }));
      console.log(evt.target);
    };

    return (
      <li className={styles.container} data-cy-add={ingredient._id}>
        <Link
          onClick={openModalHandler}
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
          data-cy-link={ingredient._id}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
