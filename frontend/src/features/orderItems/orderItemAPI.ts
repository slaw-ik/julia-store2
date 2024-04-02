import { FetchOrderItemsPayload, OrderItemsState } from './orderItemsSlice';
import { API_URL } from '../API';

export async function fetchOrderItems({ itemId, page }: FetchOrderItemsPayload) {
  return fetch(`${API_URL}/items/${itemId}/movements.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrderItemsState;
    });
}
