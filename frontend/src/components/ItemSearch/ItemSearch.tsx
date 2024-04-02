import React, { useEffect, useRef, useState } from 'react';
import { clearItems, searchItemsAsync, selectItems, selectStatus } from '../../features/items/itemsSlice';
import { useAppSelector } from '../../app/hooks';
import { setItem } from '../../features/items/itemSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ItemStructure } from '../../features/items/itemDTOs';
import { Statuses } from '../../features/API';

const ItemSearch = () => {
  const items = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState('');
  const [searchResultsVisibility, setSearchResultsVisibility] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    dispatch(searchItemsAsync(search));
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
    setSearchResultsVisibility(false);
    dispatch(clearItems());
  };

  const handleSearchResultClick = (item: ItemStructure) => {
    dispatch(setItem(item));
  };

  useEffect(() => {
    handleInputClick();
  }, [items.items]);

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
                placeholder="Item Search"
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
                items.items.map((item) => (
                  <div className="well search-result" key={item.id}>
                    <div className="row">
                      <a href="#" onMouseDown={() => handleSearchResultClick(item)}>
                        <div className="col-xs-6 col-sm-9 col-md-9 col-lg-10 title">
                          <h6>{item.name}</h6>
                          <p>{item.price} EUR</p>
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

export default ItemSearch;
