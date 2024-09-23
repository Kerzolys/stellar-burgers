import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorSelector,
  resetAllIngredients
} from '../../features/burgerConstructorSlice';
import {
  orderBurgerAsync,
  orderSelector,
  resetOrder
} from '../../features/orderSlice';
import { authSelector } from '../../features/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(orderSelector);
  const [orderLoading, setOrderLoading] = useState(false);
  const { isAuthenticated, user } = useSelector(authSelector);
  const navigate = useNavigate();
  const location = useLocation();

  const orderModalData = orderRequest.order;

  const onOrderClick = () => {
    if (!bun || orderLoading) return;
    const ingredientsIds = ingredients.map((item: TIngredient) => item._id);
    const orderData = [bun._id, ...ingredientsIds];
    console.log(isAuthenticated);
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      dispatch(orderBurgerAsync(orderData));
      setOrderLoading(true);
    }
  };

  const closeOrderModal = () => {
    setOrderLoading(false);
    dispatch(resetOrder());
    dispatch(resetAllIngredients());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderLoading}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
