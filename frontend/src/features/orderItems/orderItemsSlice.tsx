import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
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

export const itemsSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = itemsSlice.actions;

export const selectOrderItems = (state: RootState) => state.orderItems.orderItems;
export const selectStatus = (state: RootState) => state.orderItems.status;

export default itemsSlice.reducer;
