import { FetchItemMovementsPayload, ItemMovementState } from './itemMovementsSlice';
import { API_URL } from '../API';

export async function fetchItemMovements({ itemId, page }: FetchItemMovementsPayload) {
  return fetch(`${API_URL}/items/${itemId}/movements.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as ItemMovementState;
    });
}
