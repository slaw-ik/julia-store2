import React from 'react';
import OrderItem from './OrderItem';
import { OrderItemStructure } from '../../features/orderItems/orderItemDTOs';
import { OrderStructure } from '../../features/orders/orderDTOs';

type OrderProps = {
  order: OrderStructure;
};

const Order = ({ order }: OrderProps) => {
  return (
    <>
      <div className="px-2 py-3">
        <h4>Order Detail</h4>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row ">
                <div className="col-lg-12 justify-content-between d-flex">
                  <h5>Order #{order.id}</h5>
                  <div>
                    <a className="btn btn-outline-primary me-3" href={`/orders/${order.id}/invoice`}>
                      <i className="bi bi-printer pe-2"></i>
                      Invoice
                    </a>
                    <a className="btn btn-primary" href={`/orders/${order.id}/edit`}>
                      <i className="bi bi-pencil pe-2"></i>
                      Edit
                    </a>
                  </div>
                </div>
              </div>

              <div className="row mx-1 my-2 border order-items">
                <div className="col-lg-12">
                  {order.orderItems &&
                    order.orderItems.map((orderItem: OrderItemStructure) => (
                      <OrderItem orderItem={orderItem} key={orderItem.id} />
                    ))}
                </div>
              </div>

              <div className="row mx-1 mt-4">
                <div className="col-lg-2">
                  <h5>Note:</h5>
                </div>
                <div className="col-lg-4">
                  <p>{order.note || '-'}</p>
                </div>
                <div className="col-lg-4 offset-lg-2">
                  <div className="row text-end">
                    <div className="col-lg-6">
                      <h6>Total:</h6>
                    </div>
                    <div className="col-lg-6">
                      <h6>€ {order.total}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 mx-2">
                  <h5>Customer details</h5>

                  <div className="row mt-4">
                    <div className="col-lg-2">
                      <h6>First Name:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.firstName}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Last Name:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.lastName}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Email:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.client?.email}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Phone:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.phone}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Countru:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.country}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Region:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.region}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>City:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.city}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Street:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.street}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Building:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.building}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Flat:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.flat}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-2">
                      <h6>ZIP Code:</h6>
                    </div>
                    <div className="col-lg-4">
                      <p className="my-1">{order.postCode}</p>
                    </div>
                    <div className="col-lg-2">
                      <h6>Satus:</h6>
                    </div>
                    <div className="col-lg-4">
                      <span className="badge text-bg-success">{order.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body order-progress">
              <h5 className="mb-4">Activity</h5>

              <div className="row order-progress-item completed">
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order placed</p>
                    <p className="">10.10.2002 11:05</p>
                  </div>
                </div>
              </div>
              <div className="row order-progress-item completed">
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order packed</p>
                    <p className="">10.10.2002 19:50</p>
                  </div>
                </div>
              </div>
              <div className="row order-progress-item">
                <div className="col-lg-1">
                  <div className="progress-check">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                </div>
                <div className="col-lg-11">
                  <div className="d-flex justify-content-between">
                    <p className="">Order sent</p>
                    <p className="">11.10.2002 09:50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
