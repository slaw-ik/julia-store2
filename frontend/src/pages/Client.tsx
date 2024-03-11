import React from 'react';
import { useParams } from 'react-router-dom';
import ClientPage from '../components/ClientPage/ClientPage';
import NewClientPage from '../components/ClientPage/NewClientPage';

const Client = () => {
  let { id } = useParams();

  return id ? <ClientPage id={id} /> : <NewClientPage />;
};

export default Client;
