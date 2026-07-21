import { RootState } from '../store';

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectCurrentOrderLoading = (state: RootState) =>
  state.order.currentOrderLoading;
