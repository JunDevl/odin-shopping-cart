import { Outlet } from 'react-router';
import type { CartItem, FakestoreAPIResponse } from "./types"
import { use, useState } from 'react';
import { fetchData } from './api';
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
      <header className="search">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search"/>
      </header>
      
      <div className="hero">Hero exe</div>

      <Outlet context={{
        shopItems,
        cartState: [cart, setCart]
      }}/>
    </>
  )
}

export default App
