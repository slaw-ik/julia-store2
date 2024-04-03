import { OrderItemStructure } from '../orderItems/orderItemDTOs';

export interface ItemStructure {
  id?: number;
  name?: string;
  description?: string;
  count?: number;
  price?: number;
  orderItems?: OrderItemStructure[];
}

export interface ItemActiveRecordStructure {
  id?: number;
  name?: string;
  description?: string;
  // count?: number;
  price?: number;
}

export const toActiveRecordStructure = (item: ItemStructure): ItemActiveRecordStructure => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    // count: item.count,
    price: item.price,
  };
};
