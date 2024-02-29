import React from "react";
import { prettifyDate } from "../../utils/dateTime";

type OrderProps = {
  record: {
    id?: number;
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
};

const Order = ({ record }: OrderProps) => {
  const { id, state, name, fullAddress, total, note, createdAt, nickname } =
    record;

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
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              href={`/orders/${id}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Open"
              className="px-2 text-primary"
            >
              <i className="bi bi-folder2-open font-size-18"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href={`/orders/${id}/edit`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              className="px-2 text-primary"
            >
              <i className="bi bi-pencil font-size-18"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href=""
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
              className="px-2 text-danger"
            >
              <i className="bi bi-trash font-size-18"></i>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default Order;
