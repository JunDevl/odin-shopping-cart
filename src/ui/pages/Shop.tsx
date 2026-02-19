import { useOutletContext } from "react-router";
import { Suspense, useEffect, useState } from "react";
import "./pages.css";

import type { FakestoreAPIResponse, CartItem } from "../../types";

const Shop = () => {
  const {shopItems, cartState} = useOutletContext<Record<string, any>>()
  const setCart = cartState[1] as React.Dispatch<React.SetStateAction<CartItem[]>>

  const [productsWithInterest, setProductsWithInterest] = useState<Map<number, CartItem>>(new Map());

  useEffect(() => console.log(productsWithInterest), [productsWithInterest]);

  return (
    <main className="shop">
      <ul className="cards">
        <Suspense fallback={<div>Loading...</div>}>
          {(shopItems as FakestoreAPIResponse[]).map(item => 
            <li className="card" key={item.id}>
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
              <div className="buy">
                <input type="number" name="quantity" min={0} onInput={e => 
                  setProductsWithInterest(prevState => {
                    const {category, ...newItem} = item; // newItem is just item without the category property;
                    
                    const quantity = Number((e.target as HTMLInputElement).value);
                    
                    const productWithInterest = {quantity: isNaN(quantity) ? 0 : quantity, ...newItem};

                    const newState = new Map(productsWithInterest);

                    if (quantity > 0) {
                      newState.set(item.id, productWithInterest);
                      return newState;
                    }

                    newState.delete(item.id);

                    return newState;
                  })}
                />
                <button onClick={() => {
                  const input = document.querySelector<HTMLInputElement>("div.buy>input");
                  
                  console.log(input?.value);
                }}>Add to Cart</button>
              </div>
            </li>
          )}
        </Suspense>
      </ul>
    </main>
  )
}

export default Shop