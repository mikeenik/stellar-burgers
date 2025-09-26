import { FC, useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { getCurrentOrder, getOrderRequest } from '../../services/selectors';
import { getIngredients } from '../../services/selectors';
import {
  fetchOrderByNumber,
  clearError
} from '../../services/slices/order-slice';
import { fetchIngredients } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(getCurrentOrder);
  const orderRequest = useSelector(getOrderRequest);
  const orderError = useSelector((state) => state.order.error);
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(clearError());

    if (number && !orderData) {
      dispatch(fetchOrderByNumber(parseInt(number)));
    }

    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch, number, orderData, ingredients.length]);

  useEffect(() => {
    if (orderError) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 3000);
      setTimeoutId(timeout);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [orderError, navigate]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (orderRequest || ingredients.length === 0) {
    return <Preloader />;
  }

  if (orderError) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Ошибка загрузки заказа</h2>
        <p>{orderError}</p>
        <p>Перенаправление на главную страницу...</p>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Заказ не найден</h2>
        <p>Запрашиваемый заказ не существует</p>
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
