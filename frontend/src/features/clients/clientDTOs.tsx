export interface AddressStructure {
  id?: number;
  country?: string;
  city?: string;
  region?: string;
  street?: string;
  postCode?: string;
  building?: string;
  flat?: string;
  note?: string;
  fullAddress?: string;
}

export interface ClientStructure {
  id?: number;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: AddressStructure;
}

export interface ClientActiveRecordStructure {
  nickname?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address_attributes?: {
    id?: string;
    country?: string;
    city?: string;
    region?: string;
    street?: string;
    post_code?: string;
    building?: string;
    flat?: string;
    note?: string;
  };
}

export const toActiveRecordStructure = (client: ClientStructure): ClientActiveRecordStructure => {
  return {
    first_name: client.firstName,
    last_name: client.lastName,
    email: client.email,
    phone: client.phone,
    address_attributes: {
      id: client.address?.id ? client.address.id.toString() : undefined,
      country: client.address?.country,
      city: client.address?.city,
      region: client.address?.region,
      street: client.address?.street,
      post_code: client.address?.postCode,
      building: client.address?.building,
      flat: client.address?.flat,
      note: client.address?.note,
    },
  };
};
