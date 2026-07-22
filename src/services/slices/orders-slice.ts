import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export type TOrdersMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrdersState = {
  orders: TOrder[];
  isConnected: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isConnected: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchAll',
  getOrdersApi
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersConnect: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    ordersDisconnect: (state) => {
      state.isConnected = false;
    },
    ordersConnected: (state) => {
      state.isConnected = true;
    },
    ordersClosed: (state) => {
      state.isConnected = false;
    },
    ordersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnected = false;
    },
    ordersMessageReceived: (state, action: PayloadAction<TOrdersMessage>) => {
      state.orders = action.payload.orders;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error =
          action.error.message || 'Не удалось загрузить историю заказов';
      });
  }
});

export const {
  ordersConnect,
  ordersDisconnect,
  ordersConnected,
  ordersClosed,
  ordersError,
  ordersMessageReceived
} = ordersSlice.actions;

export default ordersSlice.reducer;
