import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchClient, fetchClients } from './clientAPI';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface AddressStructure {
  country?: string;
  city?: string;
  region?: string;
  street?: string;
  post_code?: string;
  building?: string;
  flat?: string;
  note?: string;
}

export interface ClientStructure {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: AddressStructure;
}

export interface ClientState {
  client: ClientStructure;
  status: Statuses;
}

interface Action {
  type: string;
  payload: Payload;
}

interface Payload {
  fieldName: string;
  fieldValue: string;
}

const initialState: ClientState = {
  client: {
    id: 0,
    firstName: '',
    lastName: '',
  },
  status: Statuses.Initial,
};

export const fetchClientAsync = createAsyncThunk(
  'clients/fetchClient',
  async (payload: string) => await fetchClient(payload)
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateClient: (state, action: Action) => {
      state.client = {
        ...state.client,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
    },
    updateClientsAddress: (state, action: Action) => {
      state.client = {
        ...state.client,
        address: {
          [action.payload.fieldName]: action.payload.fieldValue,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchClientAsync.fulfilled, (state, action) => {
        state.client = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchClientAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { updateClient, updateClientsAddress } = clientSlice.actions;

export const selectClient = (state: RootState) => state.client.client;
export const selectStatus = (state: RootState) => state.client.status;

export default clientSlice.reducer;
