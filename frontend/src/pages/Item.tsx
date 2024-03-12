import React from 'react';
import { useParams } from 'react-router-dom';
import ItemPage from '../components/ItemPage/ItemPage';
import NewItemPage from '../components/ItemPage/NewItemPage';

const Item = () => {
  let { id } = useParams();

  return id ? <ItemPage id={id} /> : <NewItemPage />;
};

export default Item;
