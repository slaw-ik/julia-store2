import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { fetchOrdersAsync, selectOrders, selectStatus } from '../../features/orders/ordersSlice';
import { AppDispatch } from '../../app/store';

import { useSearchParams } from 'react-router-dom';
import MegaTable, { BaseRecord } from '../MegaTable/MegaTable';

import './styles.css';
import Order from './Order';

const OrderIndex = () => {
  const orders = useAppSelector(selectOrders);
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
    dispatch(fetchOrdersAsync(page));
  }, [dispatch, page]);

  return (
    <div className="container">
      <MegaTable
        status={status}
        resourceName="Orders"
        resource="orders"
        records={orders.orders}
        page={page}
        total={orders.total}
        onPageChanges={handleOnPageChanges}
        dataStructure={[
          {
            key: 'id',
            name: '#',
          },
          {
            key: 'name',
            name: 'Name',
          },
          {
            key: 'state',
            name: 'State',
          },
          {
            key: 'nickname',
            name: 'Nickname',
          },
          {
            key: 'total',
            name: 'Total',
          },
          {
            key: 'created_at',
            name: 'Date',
          },
          {
            key: 'action',
            name: 'Action',
            style: { width: '200px' },
          },
        ]}
        customRow={(record: BaseRecord) => <Order key={record.id} record={record} />}
      />
    </div>
  );
};

export default OrderIndex;
