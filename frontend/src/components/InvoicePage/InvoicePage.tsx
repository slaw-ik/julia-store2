import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { selectOrder, selectStatus, fetchOrderAsync } from '../../features/orders/orderSlice';
import { AppDispatch } from '../../app/store';

import { Statuses } from '../../features/API';
import InvoicePageContent from './InvoicePageContent';


interface InvoicePageProps {
  id: string;
}

const InvoicePage = ({ id }: InvoicePageProps) => {
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
    content = <InvoicePageContent order={order} />;
  }

  return <div>{content}</div>;
};

export default InvoicePage;
