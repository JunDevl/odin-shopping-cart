import { Link, useOutletContext } from "react-router";
import { Suspense } from "react";
import { Await } from "react-router";
import ShoppingProducts from "../components/shopping_products/ShoppingProducts"
import "./pages.css";

import type { FakestoreAPIResponse, CartItem } from "../../types";

type Props = {}

const Shop = (props: Props) => {
  const {shopItems, cartState} = useOutletContext<Record<string, any>>()
  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="shop">
      <ul className="cards">
        <Suspense fallback={<div>Loading...</div>}>
          {(shopItems as FakestoreAPIResponse[]).map(item => 
            <li className="card">
              {item.title}
            </li>
          )}
        </Suspense>
      </ul>
    </main>
  )
}

export default Shop