import { OrdersState, OrderState } from './ordersSlice';
import { API_URL } from '../API';
import { OrderStructure, toActiveRecordStructure } from './orderDTOs';

export async function fetchOrders(page: number) {
  return fetch(`${API_URL}/orders.json?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}

export async function fetchOrder(orderId: string) {
  return fetch(`${API_URL}/orders/${orderId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrderState;
    });
}

export async function createOrder(payload: OrderStructure) {
  return fetch(`${API_URL}/orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: toActiveRecordStructure(payload),
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error: ', err);
      return {} as OrdersState;
    });
}
