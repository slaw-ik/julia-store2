import React from 'react';
import { useParams } from 'react-router-dom';
import OrderPage from '../components/OpderPage/OrderPage';

const OrderShow = () => {
  let { id } = useParams();

  return id ? <OrderPage id={id} /> : <></>;
};

export default OrderShow;
