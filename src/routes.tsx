import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import App from './App.tsx';
import Cart from "./ui/pages/Cart.tsx";
import Shop from "./ui/pages/Shop.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/shop" replace />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "shop",
        element: <Shop />,
        errorElement: <p>error</p>
      }
    ]
  },
]

export default routes