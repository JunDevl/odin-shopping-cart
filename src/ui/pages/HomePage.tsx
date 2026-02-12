import { Link } from "react-router"
import { useState } from "react"
import "./pages.css"
import type { CartItem } from "../../types"

type Props = {}

const HomePage = (props: Props) => {
  const [cart, setCart] = useState<CartItem[]>([])

  return (
    <>
      <header className="search">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="search"/>
      </header>
      
      <div className="hero">Hero exe</div>

      <div className="tabs">
        <Link className="home-tab" to="shop">
          Shop
        </Link>
        <Link className="home-tab" to="cart">
          Cart
        </Link>
      </div>
    </>
  )
}

export default HomePage