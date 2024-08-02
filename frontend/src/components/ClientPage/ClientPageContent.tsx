import React from 'react';
import { createClientAsync, updateClientAsync } from '../../features/clients/clientSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ClientStructure } from '../../features/clients/clientDTOs';
import ClientForm from '../ClientForm/ClientForm';

interface ClientProps {
  client: ClientStructure;
}

const ClientPageContent = ({ client }: ClientProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goBack = () => {
    navigate(-1);
  };

  const handleCancelClick = () => {
    navigate('/clients');
  };

  const handleSubmit = () => {
    if (client.id === 0) {
      dispatch(createClientAsync(client)).then(() => navigate('/clients'));
    } else {
      dispatch(updateClientAsync(client));
    }
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
        <ClientForm />
      </div>
    </div>
  );
};

export default ClientPageContent;
