import React, { useEffect, useState } from 'react';
import { ItemStructure } from '../../features/items/itemDTOs';

import './ItemCard.scss';

interface ItemCardProps {
  item: ItemStructure;
  onAddClick: (item: ItemStructure) => void;
  onCancelClick: () => void;
}

const TmpItemCard = ({ item, onAddClick, onCancelClick }: ItemCardProps) => {
  const [tmpItem, setTmpItem] = useState<ItemStructure>(item);

  const setCount = (count: string) => {
    setTmpItem({ ...tmpItem, count: parseInt(count) });
  };
  const handleAdd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onAddClick(tmpItem);
  };

  const onCancel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onCancelClick();
  };

  useEffect(() => {
    if (!tmpItem.count) setCount('1');
  }, []);

  return (
    <div className="card border shadow-none">
      <div className="card-body">
        <div className="d-flex align-items-start border-bottom pb-3">
          <div className="me-4">
            <img src="https://www.bootdey.com/image/380x380/008B8B/000000" alt="" className="avatar-lg rounded" />
          </div>
          <div className="flex-grow-1 align-self-center overflow-hidden">
            <div>
              <h5 className="text-truncate font-size-18">
                <a href="#" className="text-dark">
                  {tmpItem.name}
                </a>
              </h5>

              <p className="mb-0 mt-1">
                Description : <span>{tmpItem.description}</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ms-2">
            <ul className="list-inline mb-0 font-size-16">
              <li className="list-inline-item">
                <a href="#" className="text-muted px-1 fs-3" onClick={handleAdd}>
                  <i className="bi bi-plus green-bg-on-hover" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-muted px-1 fs-3" onClick={onCancel}>
                  <i className="bi bi-x red-bg-on-hover" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-md-4">
              <div className="mt-3">
                <p className="text-muted mb-2">Price</p>
                <h5 className="mb-0 mt-2">${tmpItem.price}</h5>
              </div>
            </div>
            <div className="col-md-5">
              <div className="mt-3">
                <p className="text-muted mb-2">Quantity</p>
                <div className="d-inline-flex col-md-5">
                  <input
                    type="number"
                    className="form-control"
                    id="count"
                    min={1}
                    onChange={(e) => setCount(e.target.value)}
                    value={tmpItem.count || 1}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mt-3">
                <p className="text-muted mb-2">Total</p>
                <h5>${(tmpItem.price || 0) * (tmpItem.count || 1)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TmpItemCard;
