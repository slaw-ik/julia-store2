import { OrderStructure } from '../orders/orderSlice';

export const fullAddress = (order: OrderStructure) => {
  return [order.street, order.building, order.flat, order.city, order.region, order.postCode, order.country]
    .filter((value) => value)
    .join(', ');
};
