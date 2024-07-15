import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchItemMovements } from './itemMovementsAPI';
import { rejectNullValuesDeep } from '../../utils/objects';
import { OrderItemStructure } from '../orderItems/orderItemDTOs';
import { Statuses } from '../API';

export interface ItemMovementState extends OrderItemStructure {
  id: number;
}

export interface ItemMovementsState {
  orderItems: {
    orderItems: ItemMovementState[];
    total: number;
    page: number;
  };
  status: Statuses;
}

const initialState: ItemMovementsState = {
  orderItems: {
    orderItems: [
      {
        id: 0,
        count: 0,
        price: 0,
        total: 0,
        itemId: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
    page: 1,
    total: 1,
  },
  status: Statuses.Initial,
};

export interface FetchItemMovementsPayload {
  page: number;
  itemId: number;
}
export const fetchItemMovementsAsync = createAsyncThunk(
  'itemMovements/fetchItemMovements',
  async (payload: FetchItemMovementsPayload) => await fetchItemMovements(payload)
);

export const itemMovementsSlice = createSlice({
  name: 'itemMovements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemMovementsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchItemMovementsAsync.fulfilled, (state, action) => {
        state.orderItems = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchItemMovementsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const {} = itemMovementsSlice.actions;

export const selectItemMovements = (state: RootState) => state.itemMovements.orderItems;
export const selectStatus = (state: RootState) => state.itemMovements.status;

export default itemMovementsSlice.reducer;
