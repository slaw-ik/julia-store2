import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';

import OrderIndex from './components/OrderIndex/OrderIndex';
import Navbar from './components/Navbar/Navbar';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Items from './pages/Items';
import Item from './pages/Item';

import 'bootstrap-icons/font/bootstrap-icons.css';
import ItemMovements from './pages/ItemMovements';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders/:id',
    element: <Order />,
  },
  {
    path: '/orders',
    element: <OrderIndex />,
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
