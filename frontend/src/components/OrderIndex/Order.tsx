import React from 'react';
import { prettifyDate } from '../../utils/dateTime';
import Actions from '../MegaTable/Actions';
import { OrderStructure } from '../../features/orders/orderSlice';

interface OrderProps {
  record: OrderStructure & {
    id: number;
  };
}

const Order = ({ record }: OrderProps) => {
  const { id, state, fullAddress, total, note, createdAt, client } = record;

  return (
    <tr>
      <td>{id}</td>
      <td>
        <a href={`/orders/${id}`} className="text-body">
          {client?.name}
        </a>
      </td>
      <td>
        <span className="badge badge-soft-success mb-0">{state}</span>
      </td>
      <td>{client?.nickname}</td>
      <td>{total}</td>
      <td>{prettifyDate(createdAt)}</td>
      <td>
        <Actions record={record} showActions={{ actions: ['show', 'edit', 'delete'] }} resource="orders" />
      </td>
    </tr>
  );
};

export default Order;
