import React from "react";

type OrderItemProps = {
  orderItem: any;
};

const OrderItem = ({ orderItem }: OrderItemProps) => {
  return (
    <tr>
      <td>
        <div className="d-flex mb-2">
          <div className="flex-shrink-0">
            <img
              src="https://www.bootdey.com/image/280x280/87CEFA/000000"
              alt=""
              width="35"
              className="img-fluid"
            ></img>
          </div>
          <div className="flex-lg-grow-1 ms-3">
            <h6 className="small mb-0">
              <a href="#" className="text-reset">
                {orderItem.item.name}
              </a>
            </h6>
          </div>
        </div>
      </td>
      <td>€ {orderItem.item.price}</td>
      <td>{orderItem.count}</td>
      <td className="text-end">€ {orderItem.total}</td>
    </tr>
  );
};

export default OrderItem;
