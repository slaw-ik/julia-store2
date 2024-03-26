import React, { useEffect, useRef, useState } from 'react';
import {
  clearClients,
  searchClientsAsync,
  selectClients,
  selectStatus,
  Statuses,
} from '../../features/clients/clientsSlice';
import { useAppSelector } from '../../app/hooks';
import { setClient } from '../../features/clients/clientSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ClientStructure } from '../../features/clients/clientDTOs';

const UserSearch = () => {
  const clients = useAppSelector(selectClients);
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

  const handleSearchResultClick = (client: ClientStructure) => {
    dispatch(setClient(client));
  };

  useEffect(() => {
    handleInputClick();
  }, [clients.clients]);

  return (
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
  );
};

export default UserSearch;
