import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchClients } from './clientAPI';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface ClientState {
  id: number;
  firstName?: string;
  lastName?: string;
}

export interface ClientsState {
  clients: {
    clients: ClientState[];
    total: number;
    page: number;
  };
  status: Statuses;
}

const initialState: ClientsState = {
  clients: {
    clients: [
      {
        id: 0,
        firstName: '',
        lastName: '',
      },
    ],
    page: 1,
    total: 1,
  },

  status: Statuses.Initial,
};

export const fetchClientsAsync = createAsyncThunk(
  'clients/fetchClients',
  async (payload: number) => await fetchClients(payload)
);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchClientsAsync.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchClientsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const {} = clientsSlice.actions;

export const selectClients = (state: RootState) => state.clients.clients;
export const selectStatus = (state: RootState) => state.clients.status;

export default clientsSlice.reducer;
