import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchItems, searchItems } from './itemAPI';
import { rejectNullValuesDeep } from '../../utils/objects';
import { ItemStructure } from './itemDTOs';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface ItemState extends ItemStructure {
  id: number;
}

export interface ItemsState {
  items: {
    items: ItemState[];
    total: number;
    page: number;
  };
  status: Statuses;
}

const initialState: ItemsState = {
  items: {
    items: [
      {
        id: 0,
        name: '',
        description: '',
        count: 0,
        price: 0,
        orderItems: [],
      },
    ],
    page: 1,
    total: 1,
  },
  status: Statuses.Initial,
};

export const fetchItemsAsync = createAsyncThunk(
  'items/fetchItems',
  async (payload: number) => await fetchItems(payload)
);

export const searchItemsAsync = createAsyncThunk(
  'clients/searchItems',
  async (payload: string) => await searchItems(payload)
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.items = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchItemsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(searchItemsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(searchItemsAsync.fulfilled, (state, action) => {
        state.items = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(searchItemsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { clearItems } = itemsSlice.actions;

export const selectItems = (state: RootState) => state.items.items;
export const selectStatus = (state: RootState) => state.items.status;

export default itemsSlice.reducer;
