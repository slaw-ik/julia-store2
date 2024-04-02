import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchOrder } from './orderAPI';
import { ClientStructure } from '../clients/clientDTOs';
import { Statuses } from '../API';
import { OrderItemStructure } from '../orderItems/orderItemDTOs';

export interface OrderStructure {
  id?: number;
  status?: string;
  total?: string;
  orderItems?: OrderItemStructure[];
  clientId?: number;
  client?: ClientStructure;
  country?: string;
  state?: string;
  note?: string;
  phone?: string;
  city?: string;
  region?: string;
  street?: string;
  postCode?: string;
  building?: string;
  flat?: string;
  fullAddress?: string;
  createdAt?: string;
}

export interface OrdersState {
  order: OrderStructure;
  status: Statuses;
}

interface OrderAction {
  type: string;
  payload: OrderStructure;
}

interface OrderItemsAction {
  type: string;
  payload: OrderItemStructure[];
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
  reducers: {
    updateOrder: (state, action: OrderAction) => {
      state.order = action.payload;
    },
    updateOrderItems: (state, action: OrderItemsAction) => {
      state.order = {
        ...state.order,
        orderItems: action.payload,
      };
    },
  },
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

export const { updateOrder, updateOrderItems } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectStatus = (state: RootState) => state.order.status;

export default orderSlice.reducer;
