import React from 'react';
import ItemPageContent from './ItemPageContent';
import { useAppSelector } from '../../app/hooks';
import { selectItem } from '../../features/items/itemSlice';

const NewItemPage = () => {
  const item = useAppSelector(selectItem);

  return <ItemPageContent item={item} />;
};

export default NewItemPage;
