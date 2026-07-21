import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { ordersConnect, ordersDisconnect } from '@slices';
import { selectUserOrders } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { ORDERS_WS_URL } from '../../utils/ws-api';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    const token = (getCookie('accessToken') || '').replace('Bearer ', '');
    dispatch(ordersConnect(`${ORDERS_WS_URL}?token=${token}`));
    return () => {
      dispatch(ordersDisconnect());
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
