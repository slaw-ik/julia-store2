import { ItemStructure } from '../items/itemDTOs';

export interface OrderItemStructure {
  id?: number;
  count?: number;
  price?: number;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
  itemId?: number;
  orderId?: number;
  item?: ItemStructure;
}

export interface OrderItemActiveRecordStructure {
  id?: number;
  count?: number;
  price?: number;
  total?: number;
  item_id: number;
  order_id?: number;
}
