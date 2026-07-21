import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredients-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice';
import orderReducer from './slices/order-slice';
import feedReducer from './slices/feed-slice';
import ordersReducer from './slices/orders-slice';
import userReducer from './slices/user-slice';
import { feedSocketMiddleware } from './middleware/feed-socket-middleware';
import { ordersSocketMiddleware } from './middleware/orders-socket-middleware';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedSocketMiddleware, ordersSocketMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
