import type { RouteObject } from "react-router";
import App from './App.tsx'
import CartPage from "./ui/pages/CartPage.tsx";
import ShopPage from "./ui/pages/ShopPage.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />
  },
  {
    path: "cart",
    element: <CartPage />
  },
  {
    path: "shop",
    element: <ShopPage />
  }
]

export default routes