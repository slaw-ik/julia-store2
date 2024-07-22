import React from 'react';
import { useParams } from 'react-router-dom';
import InvoicePage from '../components/InvoicePage/InvoicePage';
const Invoice = () => {
  let { id } = useParams();

  return id ? <InvoicePage id={id} /> : <></>;
};

export default Invoice;
