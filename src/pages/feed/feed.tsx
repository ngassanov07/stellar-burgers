import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { feedConnect, feedDisconnect } from '@slices';
import { selectFeedIsConnected, selectFeedOrders } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { FEED_WS_URL } from '../../utils/ws-api';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isConnected = useSelector(selectFeedIsConnected);

  useEffect(() => {
    dispatch(feedConnect(FEED_WS_URL));
    return () => {
      dispatch(feedDisconnect());
    };
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(feedDisconnect());
    dispatch(feedConnect(FEED_WS_URL));
  };

  if (!isConnected) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
