import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { fetchItemsAsync, selectItems, selectStatus } from '../../features/items/itemsSlice';
import { AppDispatch } from '../../app/store';

import { useSearchParams } from 'react-router-dom';
import MegaTable from '../MegaTable/MegaTable';

const ItemIndex = () => {
  const items = useAppSelector(selectItems);
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
    dispatch(fetchItemsAsync(page));
  }, [dispatch, page]);

  return (
    <div className="container">
      <MegaTable
        status={status}
        resourceName="Items"
        records={items.items}
        page={page}
        total={items.total}
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
            key: 'description',
            name: 'Description',
          },
          {
            key: 'count',
            name: 'Count',
          },
          {
            key: 'price',
            name: 'Price',
          },
        ]}
        showActions={{ resource: 'items', actions: ['show', 'delete'] }}
      />
    </div>
  );
};

export default ItemIndex;
