import React from 'react';
import { Statuses } from '../../features/orders/ordersSlice';
import Loader from './Loader';
import DefaultRow from './DefaultRow';
import { BaseRecord, DataStructure, ShowActions } from './MegaTable';

interface ComponentProps {
  records: BaseRecord[];
  resource: string;
  dataStructure: DataStructure[];
  status: string;
  customRow?: (record: BaseRecord) => JSX.Element;
  showActions?: ShowActions;
}

const Content = ({ records, resource, dataStructure, status, customRow, showActions }: ComponentProps) => {
  const keys: string[] = dataStructure.map((data: DataStructure) => data.key);

  if (status !== Statuses.UpToDate) {
    return <Loader />;
  } else {
    return (
      <>
        {records.map((record: BaseRecord) =>
          customRow ? (
            customRow(record)
          ) : (
            <DefaultRow key={record.id} record={record} keys={keys} showActions={showActions} resource={resource} />
          )
        )}
      </>
    );
  }
};

export default Content;
