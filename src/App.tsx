import "./App.css"

import { use, useState } from 'react';
import { Outlet, Link } from 'react-router';

import { fetchData } from './utils';
import type { CartItem, FakestoreAPIResponse, Sort } from "./types"

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
  const [cart, setCart] = useState<CartItem[]>([]);

  const [sort, setSort] = useState<Sort>("title");
  
  return (
    <>
      <header>
        <div className="search">
          <input type="text" id="search" name="search"/>
          <label htmlFor="search" className="search-icon">
            {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools. Credits to: https://www.svgrepo.com/svg/503086/search */}
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 17c1.71 0 3.287-.573 4.55-1.537l4.743 4.744a1 1 0 0 0 1.414-1.414l-4.744-4.744A7.5 7.5 0 1 0 9.5 17zM15 9.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>  
          </label> 
        </div>
        <div className="tabs">
          <Link to="cart" className="cart-icon">
            {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools. Credits to: https://www.svgrepo.com/svg/439533/cart-minus */}
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg" 
              className="icon"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.7351 14.0181C8.91085 13.6985 9.24662 13.5 9.61132 13.5H16.47C17.22 13.5 17.88 13.09 18.22 12.47L21.6008 6.33041C21.7106 6.13097 21.7448 5.91025 21.7129 5.70131C21.8904 5.52082 22 5.27321 22 5C22 4.44772 21.5523 4 21 4H6C5.96703 4 5.93443 4.0016 5.90228 4.00471L5.7317 3.64435C5.40095 2.94557 4.69708 2.5 3.92398 2.5H2.92004C2.36776 2.5 1.92004 2.94772 1.92004 3.5C1.92004 4.05228 2.36776 4.5 2.92004 4.5H3.14518C3.6184 4.5 4.04931 4.77254 4.25211 5.20011L7.08022 11.1627C7.35632 11.7448 7.33509 12.4243 7.02318 12.988L6.17004 14.53C5.44004 15.87 6.40004 17.5 7.92004 17.5H18.92C19.4723 17.5 19.92 17.0523 19.92 16.5C19.92 15.9477 19.4723 15.5 18.92 15.5H9.61131C8.85071 15.5 8.36855 14.6845 8.7351 14.0181ZM17.0408 10.4677L19.5108 6H6.84671L8.90839 10.3557C9.23914 11.0544 9.94301 11.5 10.7161 11.5H15.2905C16.0183 11.5 16.6886 11.1046 17.0408 10.4677Z"/>
              <path d="M7.92005 18.5C6.82005 18.5 5.93005 19.4 5.93005 20.5C5.93005 21.6 6.82005 22.5 7.92005 22.5C9.02005 22.5 9.92005 21.6 9.92005 20.5C9.92005 19.4 9.02005 18.5 7.92005 18.5Z"/>
              <path d="M17.9201 18.5C16.8201 18.5 15.9301 19.4 15.9301 20.5C15.9301 21.6 16.8201 22.5 17.9201 22.5C19.0201 22.5 19.9201 21.6 19.9201 20.5C19.9201 19.4 19.0201 18.5 17.9201 18.5Z"/>
              <path d="M10 7.5H16V9.5H10V7.5Z"/>
            </svg>
            {cart.length > 0 && 
              <span className="size">
                {cart.map(item => item.quantity).reduce((prev, cur) => prev + cur)}
              </span>
            }
            
          </Link>
          <Link to="shop" className="shop-icon">
            {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools. Credits to: https://www.svgrepo.com/svg/533028/bag-shopping */}
            <svg 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </div>
      </header>
      
      <section>
        <div className="filter">
          Order by:
          <select value={sort} onInput={e => setSort((e.target as HTMLSelectElement).value as Sort)}>
            <option value="title">Title (A-Z)</option>
            <option value="price">Price</option>
            <option value="category">Category (A-Z)</option>
            <option value="rating">Most rated</option>
            <option value="purchases">Most purchased</option>
          </select>
        </div>

        <Outlet context={{
          shopItems,
          cartState: [cart, setCart],
          sort
        }}/>
      </section>
    </>
  )
}

export default App
