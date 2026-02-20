import { useOutletContext } from "react-router";
import { formatCurrency } from "../../utils";
import "./pages.css"

import type { CartItem } from "../../types";

const Cart = () => {
  const {cartState} = useOutletContext<Record<string, any>>()

  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="cart">
      <ul className="list">
        {cart.length > 0 && cart.map(item => 
          <li className="item" key={item.id}>
            <span className="title">{item.title}</span>
            <span className="quantity">{item.quantity}</span>
            <span className="price">{formatCurrency(item.price)}</span>
            <span className="total">{formatCurrency(item.quantity * item.price)}</span>
          </li>
        )}
      </ul>
      <button className="checkout">Checkout</button>
    </main>
  )
}

export default Cart