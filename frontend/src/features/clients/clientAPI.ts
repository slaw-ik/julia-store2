import { ClientsState, ClientState } from './clientsSlice';
import { ClientStructure, toActiveRecordStructure } from './clientDTOs';

const API_URL = 'http://localhost:3000';

export async function fetchClients(page: number) {
  return fetch(`${API_URL}/clients.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ClientsState;
    });
}

export async function fetchClient(clientId: string) {
  return fetch(`${API_URL}/clients/${clientId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ClientState;
    });
}

export async function createClient(payload: ClientStructure) {
  return fetch(`${API_URL}/clients.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ClientsState;
    });
}

export async function updateClient(payload: ClientStructure) {
  return fetch(`${API_URL}/clients/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ClientState;
    });
}
