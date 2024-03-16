import React from 'react';
import { BaseRecord, ShowActions } from './MegaTable';

interface ActionsProps {
  record: BaseRecord;
  resource: string;
  showActions: ShowActions;
}

const Actions = ({ record, showActions, resource }: ActionsProps) => {
  const { id } = record;
  const showPath = `/${resource}/${id}`;
  const editPath = `/${resource}/${id}/edit`;

  if (!showActions.actions) return null;

  return (
    <ul className="list-inline mb-0">
      {showActions.actions.includes('show') && (
        <li className="list-inline-item">
          <a
            href={showPath}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Open"
            className="px-2 text-primary"
          >
            <i className="bi bi-folder2-open font-size-18"></i>
          </a>
        </li>
      )}
      {showActions.actions.includes('edit') && (
        <li className="list-inline-item">
          <a
            href={editPath}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
            className="px-2 text-primary"
          >
            <i className="bi bi-pencil font-size-18"></i>
          </a>
        </li>
      )}
      {showActions.actions.includes('delete') && (
        <li className="list-inline-item">
          <a href="" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger">
            <i className="bi bi-trash font-size-18"></i>
          </a>
        </li>
      )}
    </ul>
  );
};

export default Actions;
