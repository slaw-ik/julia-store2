import React from 'react';
import { useParams } from 'react-router-dom';
import OrderPage from '../components/OpderPage/OrderPage';

const Order = () => {
  let { id } = useParams();

  return id ? <OrderPage id={id} /> : <></>;
};

export default Order;
