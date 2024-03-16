import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { fetchClientsAsync, selectClients, selectStatus } from '../../features/clients/clientsSlice';
import { AppDispatch } from '../../app/store';

import { useSearchParams } from 'react-router-dom';
import MegaTable from '../MegaTable/MegaTable';

const ClientIndex = () => {
  const clients = useAppSelector(selectClients);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({
    page: page.toString(),
  });

  const handleOnPageChanges = (pageToChange: number) => {
    if (page !== pageToChange) setSearchParams({ page: pageToChange.toString() });
  };

  useEffect(() => {
    const currentPage = searchParams.get('page');

    if (currentPage) setPage(parseInt(currentPage));
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchClientsAsync(page));
  }, [dispatch, page]);

  return (
    <div className="container">
      <MegaTable
        status={status}
        resourceName="Clients"
        resource="clients"
        records={clients.clients}
        page={page}
        total={clients.total}
        onPageChanges={handleOnPageChanges}
        dataStructure={[
          {
            key: 'id',
            name: '#',
          },
          {
            key: 'firstName',
            name: 'First Name',
          },
          {
            key: 'lastName',
            name: 'Last Name',
          },
        ]}
        showActions={{ actions: ['show', 'delete'] }}
      />
    </div>
  );
};

export default ClientIndex;
