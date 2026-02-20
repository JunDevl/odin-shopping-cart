import { Outlet, Link } from 'react-router';
import type { CartItem, FakestoreAPIResponse } from "./types"
import { use, useEffect, useState } from 'react';
import { fetchData } from './utils';
import "./App.css"

const promiseCache = new Map<string, Promise<unknown>>();

const useQuery = <T,>({
  fn,
  key
}: {
  fn: () => Promise<T>,
  key: string
}) => {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }

  const promise = promiseCache.get(key) as Promise<T>;

  const result = use(promise);

  return result;
}

const App = () => {
  const shopItems = useQuery<FakestoreAPIResponse>({
    fn: () => fetchData('https://fakestoreapi.com/products'), 
    key: "shop"
  })
  const [cart, setCart] = useState<CartItem[]>([])

  return (
    <>
      <header>
        <div className="search">
          <label htmlFor="search" className="search-icon">search ico</label> 
          <input type="text" id="search" name="search"/>
        </div>
        <div className="tabs">
          <Link to="cart" className="cart-icon">
            cart icon
            <span className="size">{
              cart.length > 0 ? 
              cart.map(item => item.quantity).reduce((prev, cur) => prev + cur) : 
              0
            }</span>
          </Link>
          <Link to="shop" className="shop-icon">shop icon</Link>
        </div>
      </header>
      
      <section>
        <div className="filter">
          Order by:
          <select>
            <option value="name">Name (A-Z)</option>
            <option value="price">Price</option>
            <option value="category">Category (A-Z)</option>
            <option value="rating">Most rated</option>
            <option value="purchase">Most purchased</option>
          </select>
        </div>

        <Outlet context={{
          shopItems,
          cartState: [cart, setCart]
        }}/>
      </section>
    </>
  )
}

export default App
