import React from 'react';
import { useParams } from 'react-router-dom';
import EditOrderPage from '../components/EditOrderPage/EditOrderPage';

const OrderEdit = () => {
  let { id } = useParams();

  return id ? <EditOrderPage id={id} /> : <></>;
};

export default OrderEdit;
