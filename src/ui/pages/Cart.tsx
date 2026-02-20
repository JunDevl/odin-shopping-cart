import { useOutletContext } from "react-router";
import { formatCurrency, sortByProperty } from "../../utils";
import "./pages.css"

import type { CartItem } from "../../types";

const Cart = () => {
  const {cartState, sort} = useOutletContext<Record<string, any>>()

  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="cart">
      <ul className="list">
        {cart.length > 0 && cart
          .sort(sortByProperty(sort))
          .map(item => 
          <li className="item" key={item.id}>
            <div className="title">
              <img src={item.image} alt="Product Image" />
              {item.title}
            </div>
            <div className="quantity">
              <input 
                type="number" 
                name="quantity" 
                value={item.quantity} 
                onInput={e => {
                  const index = cart.findIndex(cartItem => cartItem.id === item.id);

                  const newCart = [...cart]

                  newCart[index].quantity = parseInt((e.target as HTMLInputElement).value);

                  setCart(newCart);
                }}
              />
            </div>
            <div className="price">{formatCurrency(item.price)}</div>
            <div className="total">{formatCurrency(item.quantity * item.price)}</div>
          </li>
        )}
      </ul>
      <button className="checkout">Checkout</button>
    </main>
  )
}

export default Cart