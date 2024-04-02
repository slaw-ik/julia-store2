import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { fetchOrdersAsync, OrderState, selectOrders, selectStatus } from '../../features/orders/ordersSlice';
import { AppDispatch } from '../../app/store';
import Order from './Order';
import { Statuses } from '../../features/API';

function OrderList() {
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrdersAsync(1));
  }, [dispatch]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div>
        {orders.orders.map((order: OrderState) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0">Last orders</h6>
      {contents}
      <small className="d-block text-end mt-3">
        <a href="/orders">All orders</a>
      </small>
    </div>
  );
}

export default OrderList;
