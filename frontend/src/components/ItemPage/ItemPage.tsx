import React, { useEffect } from 'react';
import ItemPageContent from './ItemPageContent';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchItemAsync, selectItem, selectStatus } from '../../features/items/itemSlice';
import { Statuses } from '../../features/API';

interface ItemPageProps {
  id: string;
}

const ItemPage = ({ id }: ItemPageProps) => {
  const item = useAppSelector(selectItem);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchItemAsync(id));
  }, [dispatch, id]);

  let content = null;

  if (status !== Statuses.UpToDate) {
    content = <div>Loading...</div>;
  } else if (item) {
    content = <ItemPageContent item={item} />;
  }

  return <div>{content}</div>;
};

export default ItemPage;
