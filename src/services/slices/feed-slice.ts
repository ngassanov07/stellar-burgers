import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedConnect: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    feedDisconnect: (state) => {
      state.isConnected = false;
    },
    feedConnected: (state) => {
      state.isConnected = true;
    },
    feedClosed: (state) => {
      state.isConnected = false;
    },
    feedError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isConnected = false;
    },
    feedMessageReceived: (state, action: PayloadAction<TFeedMessage>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const {
  feedConnect,
  feedDisconnect,
  feedConnected,
  feedClosed,
  feedError,
  feedMessageReceived
} = feedSlice.actions;

export default feedSlice.reducer;
