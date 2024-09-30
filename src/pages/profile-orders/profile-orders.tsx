import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrdersAsync, orderSelector } from '../../features/order/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
