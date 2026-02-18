import { use } from "react";
import type { FakestoreAPIResponse } from "../../../types";

type Props = {}

const ShoppingProducts = (props: Props) => {
  const SHOP_ITEMS = use<FakestoreAPIResponse[]>(fetch('https://fakestoreapi.com/products'));

  return (
    <>  
    {SHOP_ITEMS.map(item => 
      <li className="card">
        {item.title}
      </li>
    )}
    </>
  )
}

export default ShoppingProducts