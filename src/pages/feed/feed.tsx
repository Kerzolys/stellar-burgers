import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
// import { getAllOrdersAsync, ordersSelector } from '../../features/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrdersAsync, orderSelector } from '../../features/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(orderSelector);
  const dispatch = useDispatch();

  const handleGetOrders = () => {
    dispatch(getAllOrdersAsync());
  };

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetOrders} />;
};
