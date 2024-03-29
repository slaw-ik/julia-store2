import React, { useState } from 'react';

import './styles.scss';

import UserSearch from '../UserSearch/UserSearch';
import ClientForm from '../ClientForm/ClientForm';
import ItemSearch from '../ItemSearch/ItemSearch';
import ItemCard from './ItemCard';
import { useAppSelector } from '../../app/hooks';
import { selectItem } from '../../features/items/itemSlice';
import { ClientStructure } from '../../features/clients/clientDTOs';
import { OrderStructure, updateOrder } from '../../features/orders/orderSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const NewOrderPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const item = useAppSelector(selectItem);

  const setOrdersUser = (client: ClientStructure) => {
    const ordersUser: OrderStructure = {
      clientId: client.id,
      phone: client.phone,
      country: client.address?.country,
      note: client.address?.note,
      city: client.address?.city,
      region: client.address?.region,
      street: client.address?.street,
      postCode: client.address?.postCode,
      building: client.address?.building,
      flat: client.address?.flat,
    };

    dispatch(updateOrder(ordersUser));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8">
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
                <UserSearch onUserSelect={setOrdersUser} />
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

              <div className="row">
                <div className="col-lg-12">{item.name && <ItemCard item={item} />}</div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="row my-4">
                    <div className="col-sm-6">
                      <a href="ecommerce-products.html" className="btn btn-link text-muted">
                        <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping{' '}
                      </a>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <a href="ecommerce-checkout.html" className="btn btn-success">
                          <i className="mdi mdi-cart-outline me-1"></i> Checkout{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="mt-5 mt-lg-0">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-bottom py-3 px-4">
                <h5 className="font-size-16 mb-0">
                  Order Summary <span className="float-end">#MN0124</span>
                </h5>
              </div>
              <div className="card-body p-4 pt-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <td>Sub Total :</td>
                        <td className="text-end">$ 780</td>
                      </tr>
                      <tr>
                        <td>Discount :</td>
                        <td className="text-end">- $ 78</td>
                      </tr>
                      <tr>
                        <td>Shipping Charge :</td>
                        <td className="text-end">$ 25</td>
                      </tr>
                      <tr>
                        <td>Estimated Tax :</td>
                        <td className="text-end">$ 18.20</td>
                      </tr>
                      <tr className="bg-light">
                        <th>Total :</th>
                        <td className="text-end">
                          <span className="fw-bold">$ 745.2</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
