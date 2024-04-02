import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchOrderItems } from './orderItemAPI';
import { rejectNullValuesDeep } from '../../utils/objects';
import { OrderItemStructure } from './orderItemDTOs';
import { Statuses } from '../API';

export interface OrderItemState extends OrderItemStructure {
  id: number;
}

export interface OrderItemsState {
  orderItems: {
    orderItems: OrderItemState[];
    total: number;
    page: number;
  };
  status: Statuses;
}

const initialState: OrderItemsState = {
  orderItems: {
    orderItems: [
      {
        id: 0,
        count: 0,
        price: 0,
        total: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
    page: 1,
    total: 1,
  },
  status: Statuses.Initial,
};

export interface FetchOrderItemsPayload {
  page: number;
  itemId: number;
}
export const fetchOrderItemsAsync = createAsyncThunk(
  'items/fetchOrderItems',
  async (payload: FetchOrderItemsPayload) => await fetchOrderItems(payload)
);

export const itemsSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    // addOrderItem: (state, action: OrderAction) => {
    //   state.order = action.payload;
    // },
    // updateOrderItem: (state, action: OrderAction) => {
    //   state.order = action.payload;
    // },
    // deleteOrderItem: (state, action: OrderAction) => {
    //   state.order = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItemsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchOrderItemsAsync.fulfilled, (state, action) => {
        state.orderItems = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchOrderItemsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const {} = itemsSlice.actions;

export const selectOrderItems = (state: RootState) => state.orderItems.orderItems;
export const selectStatus = (state: RootState) => state.orderItems.status;

export default itemsSlice.reducer;
