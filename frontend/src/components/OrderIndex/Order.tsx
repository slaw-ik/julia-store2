import React from 'react';
import { prettifyDate } from '../../utils/dateTime';
import Actions from '../MegaTable/Actions';

interface OrderProps {
  record: {
    id: number;
    country?: string;
    status?: string;
    state?: string;
    name?: string;
    fullAddress?: string;
    total?: string;
    note?: string;
    createdAt?: string;
    nickname?: string;
  };
}

const Order = ({ record }: OrderProps) => {
  const { id, state, name, fullAddress, total, note, createdAt, nickname } = record;

  return (
    <tr>
      <td>{id}</td>
      <td>
        <a href={`/orders/${id}`} className="text-body">
          {name}
        </a>
      </td>
      <td>
        <span className="badge badge-soft-success mb-0">{state}</span>
      </td>
      <td>{nickname}</td>
      <td>{total}</td>
      <td>{prettifyDate(createdAt)}</td>
      <td>
        <Actions record={record} showActions={{ actions: ['show', 'edit', 'delete'] }} resource="orders" />
      </td>
    </tr>
  );
};

export default Order;
