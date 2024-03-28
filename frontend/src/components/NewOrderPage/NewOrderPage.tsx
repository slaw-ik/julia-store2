import React, { useState } from 'react';

import './styles.scss';

import UserSearch from '../UserSearch/UserSearch';
import ClientForm from '../ClientForm/ClientForm';
import ItemSearch from '../ItemSearch/ItemSearch';

const NewOrderPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 0 && 'active'}`} onClick={() => setActiveTab(0)}>
                Client
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 1 && 'active'}`} onClick={() => setActiveTab(1)}>
                Items
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`row ${activeTab !== 0 && 'visually-hidden'}`}>
        <div className="col-lg-12">
          <div className="row mb-3">
            <UserSearch />
          </div>

          <div className="row">
            <ClientForm />
          </div>
        </div>
      </div>

      <div className={`row ${activeTab !== 1 && 'visually-hidden'}`}>
        <div className="col-lg-12">
          <div className="row mb-3">
            <ItemSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
