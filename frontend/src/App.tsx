import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/orders/:id",
    element: <Order />,
  },
  {
    path: "/orders",
    element: <Home />,
  },
]);

function App() {
  return (
    <main className="container">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
