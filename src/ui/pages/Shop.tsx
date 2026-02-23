import "./pages.css";

import { Suspense, useState } from "react";
import { useOutletContext } from "react-router";

import SpinBox from "../components/spinbox/SpinBox";

import { formatCurrency, sortByProperty } from "../../utils";
import type { FakestoreAPIResponse, CartItem } from "../../types";

const Shop = () => {
  const {shopItems, cartState, sort} = useOutletContext<Record<string, any>>()
  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  const [productsWithInterest, setProductsWithInterest] = useState<Map<number, CartItem>>(new Map());

  return (
    <main className="shop">
      <ul className="cards">
        <Suspense fallback={<div>Loading...</div>}>
          {(shopItems as FakestoreAPIResponse[])
            .sort(sortByProperty(sort))
            .map(item => 
              <li className="card" key={item.id} tabIndex={1}>
                <div className="img">
                  <img src={item.image} alt="Product Image" />
                </div>
                <p className="title">{item.title}</p>
                <p className="rating">{item.rating.rate}</p>
                <p className="price">{formatCurrency(item.price)}</p>
                <div className="buy">
                  <SpinBox 
                    name="quantity" 
                    min={0} 
                    onValueChange={(newValue) => {
                      const {category, ...newItem} = item; // newItem is just item without the category property;
                        
                      const productWithInterest = {quantity: newValue, ...newItem};

                      const newProducts = new Map(productsWithInterest);

                      if (newValue > 0) newProducts.set(item.id, productWithInterest);
                      else newProducts.delete(item.id);

                      setProductsWithInterest(newProducts)
                    }}
                  />
                  <button 
                    onClick={(e) => {
                      const index = cart.findIndex(cart => cart.id === item.id);

                      if (!productsWithInterest.has(item.id)) return cart;

                      const cartItem = productsWithInterest.get(item.id)!;

                      const newCart = [...cart];

                      if (index >= 0) newCart[index].quantity += cartItem.quantity;
                      else newCart.push({...cartItem});
                      
                      setCart(newCart);

                      console.log(e);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
          )}
        </Suspense>
      </ul>
    </main>
  )
}

export default Shop