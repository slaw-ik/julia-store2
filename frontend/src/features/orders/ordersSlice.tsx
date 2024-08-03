import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchOrders } from './orderAPI';
import { Statuses } from '../API';
import { OrderStructure } from './orderDTOs';

export interface OrderState extends OrderStructure {
  id: number;
}

export interface OrdersState {
  orders: {
    orders: OrderState[];
    total: number;
    page: number;
  };
  status: Statuses;
}

const initialState: OrdersState = {
  orders: {
    orders: [
      {
        id: 0,
        country: '',
        status: 'pending',
      },
    ],
    page: 1,
    total: 1,
  },

  status: Statuses.Initial,
};

export const fetchOrdersAsync = createAsyncThunk(
  'orders/fetchOrders',
  async (payload: number) => await fetchOrders(payload)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchOrdersAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const {} = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
