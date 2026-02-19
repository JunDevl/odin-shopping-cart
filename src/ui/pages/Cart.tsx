import { useOutletContext } from "react-router";
import "./pages.css"

import type { CartItem } from "../../types";

const Cart = () => {
  const {cartState} = useOutletContext<Record<string, any>>()

  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="cart">
      <ul className="list">
        {cart.length > 0 && cart.map(item => 
          <li>{item.title}</li>
        )}
      </ul>
    </main>
  )
}

export default Cart