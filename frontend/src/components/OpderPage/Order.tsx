import React from 'react';
import OrderItem from './OrderItem';
import { prettifyDate } from '../../utils/dateTime';
import { OrderStructure } from '../../features/orders/orderSlice';
import { OrderItemStructure } from '../../features/orderItems/orderItemDTOs';

type OrderProps = {
  order: OrderStructure;
};

const Order = ({ order }: OrderProps) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2 className="h5 mb-0">
          <a href="#" className="text-muted"></a>
          Order #{order.id}
        </h2>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between">
                <div>
                  <span className="me-3">{prettifyDate(order.createdAt)}</span>
                  <span className="badge rounded-pill">{order.state}</span>
                </div>
                <div className="d-flex">
                  <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text">
                    <i className="bi bi-download"></i>
                    <span className="text">Invoice</span>
                  </button>
                  <div className="dropdown">
                    <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-pencil"></i> Edit
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-printer"></i> Print
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <table className="table table-borderless">
                <tbody>
                  {order.orderItems &&
                    order.orderItems.map((orderItem: OrderItemStructure) => (
                      <OrderItem orderItem={orderItem} key={orderItem.id} />
                    ))}
                </tbody>
                <tfoot>
                  <tr className="fw-bold">
                    <td colSpan={3}>TOTAL</td>
                    <td className="text-end">€ {order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h6">Note</h3>
              <p>{order.note || '-'}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h6">Shipping Information</h3>
              <strong>FedEx</strong>
              <span>
                <a href="#" className="text-decoration-underline" target="_blank">
                  FF1234567890
                </a>
                <i className="bi bi-box-arrow-up-right"></i>
              </span>
              <hr />
              <h3 className="h6">Address</h3>
              <address>
                <i className="bi bi-instagram"></i>
                <strong>{order.client?.nickname}</strong>
                <br />
                <i className="bi bi-person-fill"></i>
                <strong>{order.client?.name}</strong>
                <br />
                <i className="bi bi-house-door-fill"></i>
                {order.fullAddress}
                <br />
                <i className="bi bi-telephone-fill"></i>
                {order.phone}
                <br />
              </address>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
