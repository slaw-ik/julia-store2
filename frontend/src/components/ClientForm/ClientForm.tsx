import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectClient, updateClientAttrs, updateClientsAddressAttrs } from '../../features/clients/clientSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const ClientForm = () => {
  const client = useAppSelector(selectClient);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateClientAttrs({ fieldName: name, fieldValue: value }));
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateClientsAddressAttrs({ fieldName: name, fieldValue: value }));
  };

  return (
    <div className="col-lg-12">
      <div className="card card border shadow-none mb-4">
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

      <div className="card card border shadow-none mb-4">
        <div className="card-body">
          <h3 className="h6 mb-4">Address</h3>

          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  onChange={handleAddressInputChange}
                  value={client.address?.country}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Regoin</label>
                <input
                  type="text"
                  className="form-control"
                  name="region"
                  onChange={handleAddressInputChange}
                  value={client.address?.region}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  onChange={handleAddressInputChange}
                  value={client.address?.city}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  onChange={handleAddressInputChange}
                  value={client.address?.street}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Building</label>
                <input
                  type="text"
                  className="form-control"
                  name="building"
                  onChange={handleAddressInputChange}
                  value={client.address?.building}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Falt</label>
                <input
                  type="text"
                  className="form-control"
                  name="flat"
                  onChange={handleAddressInputChange}
                  value={client.address?.flat}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">ZIP code</label>
                <input
                  type="text"
                  className="form-control"
                  name="postCode"
                  onChange={handleAddressInputChange}
                  value={client.address?.postCode}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3">
                <label className="form-label">Note</label>
                <textarea
                  className="form-control"
                  rows={3}
                  name="note"
                  onChange={handleAddressInputChange}
                  value={client.address?.note}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
