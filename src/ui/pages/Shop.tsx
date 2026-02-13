import { Link, useOutletContext } from "react-router";
import { Suspense } from "react";
import { Await } from "react-router";
import "./pages.css";

import type { FakestoreAPIResponse, CartItem } from "../../types";

type Props = {}

const Shop = (props: Props) => {
  const {SHOP_ITEMS, cartState} = useOutletContext<Record<string, any>>()
  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="shop">
      <ul className="cards">
        {SHOP_ITEMS as FakestoreAPIResponse[] | null && (SHOP_ITEMS as FakestoreAPIResponse[]).map(item => 
          <li className="card">
            {item.title}
          </li>
        )}
      </ul>
    </main>
  )
}

export default Shop