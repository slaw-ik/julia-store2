import React from 'react';
import { useParams } from 'react-router-dom';
import ItemMovementsPage from '../components/ItemMovementsPage/ItemMovementsPage';

const ItemMovements = () => {
  const { id } = useParams();

  return <ItemMovementsPage id={id} />;
};

export default ItemMovements;
