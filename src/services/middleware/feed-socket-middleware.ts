import { createSocketMiddleware } from './socket-middleware';
import {
  feedClosed,
  feedConnect,
  feedConnected,
  feedDisconnect,
  feedError,
  feedMessageReceived,
  TFeedMessage
} from '../slices/feed-slice';

export const feedSocketMiddleware = createSocketMiddleware<TFeedMessage>({
  connect: feedConnect,
  disconnect: feedDisconnect,
  onOpen: feedConnected,
  onClose: feedClosed,
  onError: feedError,
  onMessage: feedMessageReceived
});
