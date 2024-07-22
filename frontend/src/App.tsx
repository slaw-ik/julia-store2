import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import OrderShow from './pages/OrderShow';
import OrderEdit from './pages/OrderEdit';
import OrderIndex from './components/OrderIndex/OrderIndex';
import Navbar from './components/Navbar/Navbar';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Items from './pages/Items';
import Item from './pages/Item';
import ItemMovements from './pages/ItemMovements';
import NewOrder from './pages/NewOrder';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Invoice from './pages/Invoice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders/:id',
    element: <OrderShow />,
  },
  {
    path: '/orders/:id/edit',
    element: <OrderEdit />,
  },
  {
    path: '/orders',
    element: <OrderIndex />,
  },
  {
    path: '/orders/new',
    element: <NewOrder />,
  },
  {
    path: '/orders/:id/invoice',
    element: <Invoice />,
  },
  {
    path: '/clients',
    element: <Clients />,
  },
  {
    path: '/clients/:id',
    element: <Client />,
  },
  {
    path: '/clients/new',
    element: <Client />,
  },
  {
    path: '/items',
    element: <Items />,
  },
  {
    path: '/items/:id',
    element: <Item />,
  },
  {
    path: '/items/new',
    element: <Item />,
  },
  {
    path: '/items/:id/movements',
    element: <ItemMovements />,
  },
]);

const App = () => (
  <>
    <Navbar />
    <main className="container-fluid">
      <div className="container pt-5">
        <RouterProvider router={router} />
      </div>
    </main>
  </>
);

export default App;
