import React from 'react';
import ClientPageContent from './ClientPageContent';
import { useAppSelector } from '../../app/hooks';
import { selectClient } from '../../features/clients/clientSlice';

const NewClientPage = () => {
  const client = useAppSelector(selectClient);

  return <ClientPageContent client={client} />;
};

export default NewClientPage;
