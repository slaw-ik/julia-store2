import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../app/hooks";
import { selectOrder, selectStatus, fetchOrderAsync, Statuses } from "../../features/orders/orderSlice";
import { AppDispatch } from "../../app/store";

const OrderPage = ({ id }) => {
  const order = useAppSelector(selectOrder);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderAsync(id));
  }, [dispatch, id]    );

  let content = null;

  if (status !== Statuses.UpToDate) {
    content = <div>Loading...</div>;
  } else if (order) {
    content = (
      <div>
        <div>Order ID: {order.id}</div>
        <div>Order Name: {order.name}</div>
        <div>Order Description: {order.description}</div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default OrderPage;
