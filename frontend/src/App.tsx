import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import OrderIndex from './components/OrderIndex/OrderIndex';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar/Navbar';
import ClientIndex from './components/ClientIndex/ClientIndex';

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
    element: <ClientIndex />,
  },
]);

function App() {
  return (
    <>
      <Navbar />
      <main className="container-fluid">
        <div className="container pt-5">
          <RouterProvider router={router} />
        </div>
      </main>
    </>
  );
}

export default App;
