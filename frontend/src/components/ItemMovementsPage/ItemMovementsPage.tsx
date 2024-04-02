import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useSearchParams } from 'react-router-dom';
import MegaTable from '../MegaTable/MegaTable';
import {
  fetchItemMovementsAsync,
  selectItemMovements,
  selectStatus,
} from '../../features/itemMovements/itemMovementsSlice';

interface ItemMovementsPageProps {
  id: string | undefined;
}

const ItemMovementsPage = ({ id }: ItemMovementsPageProps) => {
  const itemMovements = useAppSelector(selectItemMovements);
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
    const itemId = parseInt(id || '0');

    if (currentPage) setPage(parseInt(currentPage));
  }, [searchParams]);

  useEffect(() => {
    dispatch(fetchItemMovementsAsync({ itemId: parseInt(id || '0'), page }));
  }, [dispatch, page]);

  return (
    <div className="container">
      <MegaTable
        status={status}
        resourceName="Movements"
        resource="orderItems"
        records={itemMovements.orderItems}
        page={page}
        total={itemMovements.total}
        onPageChanges={handleOnPageChanges}
        dataStructure={[
          {
            key: 'id',
            name: '#',
          },
          {
            key: 'price',
            name: 'Price',
          },
          {
            key: 'count',
            name: 'Count',
          },
          {
            key: 'total',
            name: 'Total',
          },
          {
            key: 'createdAt',
            name: 'Created At',
          },
          {
            key: 'updatedAt',
            name: 'Updated At',
          },
        ]}
      />
    </div>
  );
};

export default ItemMovementsPage;
