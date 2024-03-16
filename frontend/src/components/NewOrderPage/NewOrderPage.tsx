import React, { useState } from 'react';

import './styles.scss';
import { useAppSelector } from '../../app/hooks';
import { searchClientsAsync, selectClients, selectStatus, Statuses } from '../../features/clients/clientsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const NewOrderPage = () => {
  const clients = useAppSelector(selectClients);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState('');
  const handleSearch = () => {
    dispatch(searchClientsAsync(search));
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="well">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-btn">
                <button className="btn btn-info btn-lg" type="button" onClick={handleSearch}>
                  <i className="glyphicon glyphicon-search" />
                  Search
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          {status === Statuses.Loading && <div>Loading...</div>}
          {status === Statuses.Error && <div>Error</div>}
          {status === Statuses.UpToDate &&
            clients.clients.map((client) => (
              <div className="well search-result" key={client.id}>
                <div className="row">
                  <a href="#">
                    <div className="col-xs-6 col-sm-9 col-md-9 col-lg-10 title">
                      <h6>
                        {client.firstName} {client.lastName}
                      </h6>
                      <p>{client.address?.fullAddress}</p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
