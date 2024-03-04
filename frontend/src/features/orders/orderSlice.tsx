import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchOrder } from './orderAPI';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface OrderState {
  id?: number;
  country?: string;
  status?: string;
  state?: string;
  name?: string;
  fullAddress?: string;
  total?: string;
  note?: string;
  created_at?: string;
  nickname?: string;
}

export interface OrdersState {
  order: OrderState;
  status: Statuses;
}

const initialState: OrdersState = {
  order: {
    id: 0,
    country: '',
    status: 'pending',
  },

  status: Statuses.Initial,
};

export const fetchOrderAsync = createAsyncThunk(
  'orders/fetchOrder',
  async (payload: string) => await fetchOrder(payload)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchOrderAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const {} = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectStatus = (state: RootState) => state.order.status;

export default orderSlice.reducer;
