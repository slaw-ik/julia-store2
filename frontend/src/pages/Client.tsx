import React from 'react';
import { useParams } from 'react-router-dom';
import ClientPage from '../components/ClientPage/ClientPage';

const Client = () => {
  let { id } = useParams();

  return id ? <ClientPage id={id} /> : <></>;
};

export default Client;
