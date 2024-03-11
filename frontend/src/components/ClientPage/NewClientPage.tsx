import React from 'react';
import Client from './Client';
import { useAppSelector } from '../../app/hooks';
import { selectClient } from '../../features/clients/clientSlice';

const NewClientPage = () => {
  const client = useAppSelector(selectClient);

  return <Client client={client} />;
};

export default NewClientPage;
