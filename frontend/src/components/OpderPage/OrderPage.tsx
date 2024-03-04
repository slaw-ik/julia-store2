import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { selectOrder, selectStatus, fetchOrderAsync, Statuses } from '../../features/orders/orderSlice';
import { AppDispatch } from '../../app/store';
import Order from './Order';

type OrderPageProps = {
  id: string;
};

const OrderPage = ({ id }: OrderPageProps) => {
  const order = useAppSelector(selectOrder);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOrderAsync(id));
  }, [dispatch, id]);

  let content = null;

  if (status !== Statuses.UpToDate) {
    content = <div>Loading...</div>;
  } else if (order) {
    content = <Order order={order} />;
  }

  return <div>{content}</div>;
};

export default OrderPage;
