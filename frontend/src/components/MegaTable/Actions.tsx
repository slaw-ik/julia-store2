import React from 'react';
import { BaseRecord } from './MegaTable';

interface ActionsProps {
  resourceName: string;
  record: BaseRecord;
}

const Actions = ({ resourceName, record }: ActionsProps) => {
  const { id } = record;
  const showPath = `/${resourceName}/${id}`;
  const editPath = `/${resourceName}/${id}/edit`;

  return (
    <ul className="list-inline mb-0">
      <li className="list-inline-item">
        <a href={showPath} data-bs-toggle="tooltip" data-bs-placement="top" title="Open" className="px-2 text-primary">
          <i className="bi bi-folder2-open font-size-18"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href={editPath} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" className="px-2 text-primary">
          <i className="bi bi-pencil font-size-18"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger">
          <i className="bi bi-trash font-size-18"></i>
        </a>
      </li>
    </ul>
  );
};

export default Actions;
