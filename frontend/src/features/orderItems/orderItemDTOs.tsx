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
