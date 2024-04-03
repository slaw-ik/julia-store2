import React from 'react';
import { prettifyDate } from '../../utils/dateTime';
import { ItemStructure } from '../../features/items/itemDTOs';

interface ItemProps {
  item: ItemStructure;
}

const ItemMovements = ({ item }: ItemProps) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-lg-center mb-3 flex-column flex-lg-row">
          <h3 className="h6 mb-4">Last 5 movements</h3>
          <a href={`/items/${item.id}/movements`} className="btn btn-primary align-content-end">
            Show all
          </a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Price</th>
                <th>Count</th>
                <th>Total</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {item.orderItems &&
                item.orderItems.map((orderItem, index) => (
                  <tr key={index}>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.count}</td>
                    <td>{orderItem.total}</td>
                    <td>{prettifyDate(orderItem.createdAt)}</td>
                    <td>{prettifyDate(orderItem.updatedAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemMovements;
