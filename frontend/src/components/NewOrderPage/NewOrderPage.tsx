import React, { useEffect, useRef, useState } from 'react';

import './styles.scss';
import { useAppSelector } from '../../app/hooks';
import {
  clearClients,
  searchClientsAsync,
  selectClients,
  selectStatus,
  Statuses,
} from '../../features/clients/clientsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { selectClient, setClient } from '../../features/clients/clientSlice';
import { ClientStructure } from '../../features/clients/clientDTOs';

const NewOrderPage = () => {
  const clients = useAppSelector(selectClients);
  const client = useAppSelector(selectClient);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState('');
  const [searchResultsVisibility, setSearchResultsVisibility] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    dispatch(searchClientsAsync(search));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      clearSearch();
    }
  };

  const handleInputClick = () => {
    if (search.length > 0 && ref.current) {
      setSearchResultsVisibility(true);
      ref.current.select();
    }
  };

  const clearSearch = () => {
    setSearch('');
    dispatch(clearClients());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // dispatch(updateClientAttrs({ fieldName: name, fieldValue: value }));
  };

  const handleSearchResultClick = (client: ClientStructure) => {
    dispatch(setClient(client));
  };

  useEffect(() => {
    handleInputClick();
  }, [clients.clients]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="well">
                <div className="input-group">
                  <input
                    ref={ref}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={(e) => handleKeyUp(e)}
                    onBlur={(e) => setSearchResultsVisibility(false)}
                    onClick={(e) => handleInputClick()}
                  />
                  <span className="search-clear" onClick={clearSearch}>
                    <i className="bi bi-x-lg" />
                  </span>

                  <button className="btn btn-primary" type="button" onClick={handleSearch}>
                    <i className="glyphicon glyphicon-search" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {searchResultsVisibility && (
            <div className="row search-results-container">
              <div className="col-lg-12">
                <div className="pop-up">
                  {status === Statuses.Loading && <div>Loading...</div>}
                  {status === Statuses.Error && <div>Error</div>}
                  {status === Statuses.UpToDate &&
                    clients.clients.map((client) => (
                      <div className="well search-result" key={client.id}>
                        <div className="row">
                          <a href="#" onMouseDown={() => handleSearchResultClick(client)}>
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
          )}
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
                    <label className="form-label">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={client.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={client.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={client.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label className="form-label">Phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={client.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
