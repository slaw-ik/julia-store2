import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createOrder, fetchOrder } from './orderAPI';
import { Statuses } from '../API';
import { OrderItemStructure } from '../orderItems/orderItemDTOs';
import { OrderStructure } from './orderDTOs';

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
    clientId: 0,
  },

  status: Statuses.Initial,
};

export const fetchOrderAsync = createAsyncThunk(
  'orders/fetchOrder',
  async (payload: string) => await fetchOrder(payload),
);

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (payload: OrderStructure) => await createOrder(payload),
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrder: (state, action: OrderAction) => {
      state.order = {
        ...state.order,
        ...action.payload
      };
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
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { updateOrder, updateOrderItems } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectStatus = (state: RootState) => state.order.status;

export default orderSlice.reducer;
