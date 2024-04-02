import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createItem, fetchItem, updateItem } from './itemAPI';
import { ItemStructure } from './itemDTOs';
import { rejectNullValuesDeep } from '../../utils/objects';
import { Statuses } from '../API';

export interface ItemState {
  item: ItemStructure;
  status: Statuses;
}

interface Action {
  type: string;
  payload: Payload;
}

interface ItemAction {
  type: string;
  payload: ItemStructure;
}

interface Payload {
  fieldName: string;
  fieldValue: string;
}

const initialState: ItemState = {
  item: {
    id: 0,
    name: '',
    description: '',
    count: 0,
    price: 0,
    orderItems: [],
  },
  status: Statuses.Initial,
};

export const fetchItemAsync = createAsyncThunk('items/fetchItem', async (payload: string) => await fetchItem(payload));

export const createItemAsync = createAsyncThunk(
  'items/createItem',
  async (payload: ItemStructure) => await createItem(payload)
);

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async (payload: ItemStructure) => await updateItem(payload)
);

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action: ItemAction) => {
      state.item = action.payload;
    },
    updateItemAttrs: (state, action: Action) => {
      state.item = {
        ...state.item,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchItemAsync.fulfilled, (state, action) => {
        state.item = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchItemAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(createItemAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(createItemAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(updateItemAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { setItem, updateItemAttrs } = itemSlice.actions;

export const selectItem = (state: RootState) => state.item.item;
export const selectStatus = (state: RootState) => state.item.status;

export default itemSlice.reducer;
