import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchClients, searchClients } from './clientAPI';
import { ClientStructure } from './clientDTOs';
import { rejectNullValuesDeep } from '../../utils/objects';
import { Statuses } from '../API';

export interface ClientState extends ClientStructure {
  id: number;
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
    clients: [],
    page: 1,
    total: 0,
  },

  status: Statuses.Initial,
};

export const fetchClientsAsync = createAsyncThunk(
  'clients/fetchClients',
  async (payload: number) => await fetchClients(payload)
);

export const searchClientsAsync = createAsyncThunk(
  'clients/searchClients',
  async (payload: string) => await searchClients(payload)
);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearClients: (state) => {
      state.clients.clients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(fetchClientsAsync.fulfilled, (state, action) => {
        state.clients = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchClientsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(searchClientsAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(searchClientsAsync.fulfilled, (state, action) => {
        state.clients = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(searchClientsAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { clearClients } = clientsSlice.actions;

export const selectClients = (state: RootState) => state.clients.clients;
export const selectStatus = (state: RootState) => state.clients.status;

export default clientsSlice.reducer;
