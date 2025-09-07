import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getUserOrders,
  getUserOrdersLoading,
  getUserOrdersError
} from '../../services/selectors';
import { fetchUserOrders } from '../../services/slices/user-orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrders);
  const isLoading = useSelector(getUserOrdersLoading);
  const error = useSelector(getUserOrdersError);

  useEffect(() => {
    console.log('ProfileOrders: Запуск загрузки заказов');
    dispatch(fetchUserOrders());
  }, [dispatch]);

  console.log('ProfileOrders: orders =', orders);
  console.log('ProfileOrders: isLoading =', isLoading);
  console.log('ProfileOrders: error =', error);

  if (isLoading) {
    return <div>Загрузка заказов...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки заказов: {error}</div>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
