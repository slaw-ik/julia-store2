import React from 'react';
import Item from './Item';
import { useAppSelector } from '../../app/hooks';
import { selectItem } from '../../features/items/itemSlice';

const NewItemPage = () => {
  const item = useAppSelector(selectItem);

  return <Item item={item} />;
};

export default NewItemPage;
