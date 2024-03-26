import React from 'react';

import './styles.scss';

import UserSearch from '../UserSearch/UserSearch';
import ClientForm from '../ClientForm/ClientForm';

const NewOrderPage = () => {
  return (
    <div className="container">
      <div className="row">
        <UserSearch />
      </div>

      <div className="row">
        <ClientForm />
      </div>
    </div>
  );
};

export default NewOrderPage;
