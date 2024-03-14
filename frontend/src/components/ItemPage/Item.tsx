import React from 'react';
import { createItemAsync, updateItemAsync, updateItemAttrs } from '../../features/items/itemSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ItemStructure } from '../../features/items/itemDTOs';
import ItemMovements from './ItemMovements';

interface ItemProps {
  item: ItemStructure;
}

const Item = ({ item }: ItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goBack = () => {
    navigate(-1);
  };

  const handleCancelClick = () => {
    navigate('/items');
  };

  const handleSubmit = () => {
    if (item.id === 0) {
      dispatch(createItemAsync(item)).then(() => navigate('/items'));
    } else {
      dispatch(updateItemAsync(item));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateItemAttrs({ fieldName: name, fieldValue: value }));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-lg-center mb-3 flex-column flex-lg-row">
        <h2 className="h5 mb-3 mb-lg-0">
          <a className="text-muted" onClick={goBack}>
            <i className="bi bi-arrow-left-square me-2" style={{ cursor: 'pointer' }}></i>
          </a>{' '}
          Create new customer
        </h2>
        <div className="hstack gap-3">
          <button className="btn btn-light btn-sm btn-icon-text" onClick={handleCancelClick}>
            <i className="bi bi-x"></i> <span className="text">Cancel</span>
          </button>
          <button className="btn btn-primary btn-sm btn-icon-text" onClick={handleSubmit}>
            <i className="bi bi-check"></i> <span className="text">Save</span>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="h6 mb-4">Basic information</h3>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={item.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={item.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Count</label>
                    <input
                      type="text"
                      className="form-control"
                      name="count"
                      value={item.count}
                      // onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="description"
                      onChange={handleInputChange}
                      value={item.description}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {item.id !== 0 && <ItemMovements item={item} />}
        </div>
      </div>
    </div>
  );
};

export default Item;
