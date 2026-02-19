import { useOutletContext } from "react-router";
import { Suspense } from "react";
import "./pages.css";

import type { FakestoreAPIResponse, CartItem } from "../../types";

const Shop = () => {
  const {shopItems, cartState} = useOutletContext<Record<string, any>>()
  const setCart = cartState[1] as React.Dispatch<React.SetStateAction<CartItem[]>>

  return (
    <main className="shop">
      <ul className="cards">
        <Suspense fallback={<div>Loading...</div>}>
          {(shopItems as FakestoreAPIResponse[]).map(item => 
            <li className="card">
              <div className="img">
                <img src={item.image} alt="" />
              </div>
              <p className="title">{item.title}</p>
              <p className="price">{
                new Intl.NumberFormat(navigator.language, {
                  style: "currency",
                  currencyDisplay: "symbol",
                  currency: "USD"
                }).format(item.price)
              }</p>
            </li>
          )}
        </Suspense>
      </ul>
    </main>
  )
}

export default Shop