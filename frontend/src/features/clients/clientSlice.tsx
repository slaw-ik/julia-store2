import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createClient, fetchClient, updateClient } from './clientAPI';
import { ClientStructure } from './clientDTOs';
import { rejectNullValuesDeep } from '../../utils/objects';

export enum Statuses {
  Initial = 'Not fetched',
  Loading = 'Loading...',
  UpToDate = 'Up to date',
  Deleted = 'Deleted',
  Error = 'Error',
}

export interface ClientState {
  client: ClientStructure;
  status: Statuses;
}

interface Action {
  type: string;
  payload: Payload;
}

interface ClientAction {
  type: string;
  payload: ClientStructure;
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
    email: '',
    phone: '',
    address: {
      id: 0,
      country: '',
      city: '',
      region: '',
      street: '',
      postCode: '',
      building: '',
      flat: '',
      note: '',
    },
  },
  status: Statuses.Initial,
};

export const fetchClientAsync = createAsyncThunk(
  'clients/fetchClient',
  async (payload: string) => await fetchClient(payload)
);

export const createClientAsync = createAsyncThunk(
  'clients/createClient',
  async (payload: ClientStructure) => await createClient(payload)
);

export const updateClientAsync = createAsyncThunk(
  'clients/updateClient',
  async (payload: ClientStructure) => await updateClient(payload)
);

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (state, action: ClientAction) => {
      state.client = action.payload;
    },
    updateClientAttrs: (state, action: Action) => {
      state.client = {
        ...state.client,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
    },
    updateClientsAddressAttrs: (state, action: Action) => {
      state.client = {
        ...state.client,
        address: {
          ...state.client.address,
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
        state.client = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(fetchClientAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(createClientAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(createClientAsync.fulfilled, (state, action) => {
        state.client = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(createClientAsync.rejected, (state) => {
        state.status = Statuses.Error;
      })
      .addCase(updateClientAsync.pending, (state) => {
        state.status = Statuses.Loading;
      })
      .addCase(updateClientAsync.fulfilled, (state, action) => {
        state.client = rejectNullValuesDeep(action.payload);
        state.status = Statuses.UpToDate;
      })
      .addCase(updateClientAsync.rejected, (state) => {
        state.status = Statuses.Error;
      });
  },
});

export const { setClient, updateClientAttrs, updateClientsAddressAttrs } = clientSlice.actions;

export const selectClient = (state: RootState) => state.client.client;
export const selectStatus = (state: RootState) => state.client.status;

export default clientSlice.reducer;
