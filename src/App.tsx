import { Outlet } from 'react-router';
import type { CartItem, FakestoreAPIResponse } from "./types"
import { useEffect, useRef, useState } from 'react';
import "./App.css"

const App = () => {
  // i will absolutely handle all fake data fetching in one go, the response just gives an array of 20 items. Implementing lazy-loading takes time, guys :)
  const [SHOP_ITEMS, SET_SHOP_ITEMS] = useState<FakestoreAPIResponse[]>();

  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(obj => SET_SHOP_ITEMS(obj))
  }, [])

  return (
    <>
      <header className="search">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search"/>
      </header>
      
      <div className="hero">Hero exe</div>

      <Outlet context={{
        SHOP_ITEMS,
        cartState: [cart, setCart]
      }}/>
    </>
  )
}

export default App
