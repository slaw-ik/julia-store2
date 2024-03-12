export interface ItemStructure {
  id?: number;
  name?: string;
  description?: string;
  count?: number;
  price?: number;
}

export interface ItemActiveRecordStructure extends ItemStructure {}

export const toActiveRecordStructure = (client: ItemStructure): ItemActiveRecordStructure => {
  return client;
};
