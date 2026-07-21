import { RootState } from '../store';

export const selectUserOrders = (state: RootState) => state.orders.orders;
