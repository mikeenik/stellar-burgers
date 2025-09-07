import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedOrders, getFeedLoading } from '../../services/selectors';
import { fetchFeeds } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeedOrders);
  const isLoading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
