import React, { useEffect } from 'react';
import Client from './Client';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchClientAsync, selectClient, selectStatus } from '../../features/clients/clientSlice';
import { Statuses } from '../../features/API';

interface ClientPageProps {
  id: string;
}

const ClientPage = ({ id }: ClientPageProps) => {
  const client = useAppSelector(selectClient);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClientAsync(id));
  }, [dispatch, id]);

  let content = null;

  if (status !== Statuses.UpToDate) {
    content = <div>Loading...</div>;
  } else if (client) {
    content = <Client client={client} />;
  }

  return <div>{content}</div>;
};

export default ClientPage;
