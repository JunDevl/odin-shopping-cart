import { useOutletContext } from "react-router";
import "./pages.css"

import type { CartItem } from "../../types";

type Props = {}

const Cart = (props: Props) => {
  const {cartState} = useOutletContext<Record<string, any>>()

  const [cart, setCart] = cartState as [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>]

  return (
    <main className="cart">
      <ul className="list">
        
      </ul>
    </main>
  )
}

export default Cart