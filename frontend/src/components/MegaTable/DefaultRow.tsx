import React from 'react';
import { BaseRecord } from './MegaTable';

interface DefaultRowProps {
  record: BaseRecord;
  keys: string[];
}

const DefaultRow = ({ record, keys }: DefaultRowProps) => {
  return (
    <tr>
      {keys.map((key) => {
        const value = record[key as keyof BaseRecord];

        return <td key={key}>{value}</td>;
      })}
    </tr>
  );
};

export default DefaultRow;
