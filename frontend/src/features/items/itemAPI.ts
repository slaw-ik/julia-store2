import { ItemsState, ItemState } from './itemsSlice';
import { ItemStructure, toActiveRecordStructure } from './itemDTOs';
import { API_URL } from '../API';

export async function fetchItems(page: number) {
  return fetch(`${API_URL}/items.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemsState;
    });
}

export async function searchItems(promt: string) {
  return fetch(`${API_URL}/items/search.json?promt=${promt}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemsState;
    });
}

export async function fetchItem(itemId: string) {
  return fetch(`${API_URL}/items/${itemId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemState;
    });
}

export async function createItem(payload: ItemStructure) {
  return fetch(`${API_URL}/items.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemsState;
    });
}

export async function updateItem(payload: ItemStructure) {
  return fetch(`${API_URL}/items/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemState;
    });
}
