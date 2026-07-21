import { createSocketMiddleware } from './socket-middleware';
import {
  ordersClosed,
  ordersConnect,
  ordersConnected,
  ordersDisconnect,
  ordersError,
  ordersMessageReceived,
  TOrdersMessage
} from '../slices/orders-slice';

export const ordersSocketMiddleware = createSocketMiddleware<TOrdersMessage>({
  connect: ordersConnect,
  disconnect: ordersDisconnect,
  onOpen: ordersConnected,
  onClose: ordersClosed,
  onError: ordersError,
  onMessage: ordersMessageReceived
});
