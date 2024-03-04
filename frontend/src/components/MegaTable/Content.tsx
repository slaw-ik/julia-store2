import React from 'react';
import { Statuses } from '../../features/orders/ordersSlice';
import Loader from './Loader';
import DefaultRow from './DefaultRow';
import { BaseRecord, DataStructure } from './MegaTable';

interface ComponentProps {
  records: BaseRecord[];
  dataStructure: DataStructure[];
  status: string;
  customRow?: (record: BaseRecord) => JSX.Element;
}

const Content = ({ records, dataStructure, status, customRow }: ComponentProps) => {
  const keys: string[] = dataStructure.map((data: DataStructure) => data.key);

  if (status !== Statuses.UpToDate) {
    return <Loader />;
  } else {
    return (
      <>
        {records.map((record: BaseRecord) =>
          customRow ? customRow(record) : <DefaultRow key={record.id} record={record} keys={keys} />
        )}
      </>
    );
  }
};

export default Content;
