import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware
} from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TSocketHandlers<TMessage> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TMessage>;
};

export const createSocketMiddleware = <TMessage>(
  handlers: TSocketHandlers<TMessage>
): Middleware<{}, RootState> => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    if (handlers.connect.match(action)) {
      socket = new WebSocket(action.payload);

      socket.onopen = () => {
        store.dispatch(handlers.onOpen());
      };

      socket.onerror = () => {
        store.dispatch(handlers.onError('Ошибка соединения с сервером'));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success === false) {
          store.dispatch(
            handlers.onError(data.message || 'Ошибка соединения с сервером')
          );
          return;
        }
        store.dispatch(handlers.onMessage(data));
      };

      socket.onclose = () => {
        store.dispatch(handlers.onClose());
      };
    }

    if (handlers.disconnect.match(action)) {
      socket?.close();
      socket = null;
    }

    next(action);
  };
};
