import { OrderItemActiveRecordStructure, OrderItemStructure } from '../orderItems/orderItemDTOs';
import { ClientStructure } from '../clients/clientDTOs';

export interface OrderStructure {
  id?: number;
  status?: string;
  total?: string;
  orderItems?: OrderItemStructure[];
  clientId?: number;
  client?: ClientStructure;
  country?: string;
  state?: string;
  note?: string;
  phone?: string;
  city?: string;
  region?: string;
  street?: string;
  postCode?: string;
  building?: string;
  flat?: string;
  fullAddress?: string;
  createdAt?: string;
}

export interface OrderActiveRecordStructure {
  id?: number;
  supplier_id?: number;
  client_id: number;
  type?: string;
  state?: string;
  total?: string;
  country?: string;
  city?: string;
  region?: string;
  street?: string;
  post_code?: string;
  building?: string;
  flat?: string;
  note?: string;
  phone?: string;
  order_item_attributes?: OrderItemActiveRecordStructure[];
}

export const toActiveRecordStructure = (order: OrderStructure): OrderActiveRecordStructure => {
  return {
    id: order.id,
    client_id: order.clientId!,
    country: order.country || '',
    state: order.state || '',
    total: order.total || '',
    city: order.city || '',
    region: order.region || '',
    street: order.street || '',
    post_code: order.postCode || '',
    building: order.building || '',
    flat: order.flat || '',
    note: order.note || '',
    phone: order.phone || '',
    order_item_attributes:
      order.orderItems?.map((orderItem) => ({
        id: orderItem.id!,
        item_id: orderItem.itemId!,
        count: orderItem.count!,
        price: orderItem.price!,
        total: orderItem.total!,
      })) || [],
  };
};
