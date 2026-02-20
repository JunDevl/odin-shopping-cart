import type { Sort, FakestoreAPIResponse, CartItem } from "./types";

export const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    return json
  } catch (error) {
    console.log(error);
    return;
  }
}

export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat(
    navigator.language, 
    {
      style: "currency",
      currencyDisplay: "symbol",
      currency: "USD"
    }
  )

  return formatter.format(amount);
}

export const sortByProperty = <T extends Record<string, any>[]>(property: Sort) => {
  let sortOrder = 1;
  if (property[0] === "-") {
      sortOrder = -1;
      property = property.substring(1) as Sort;
  }
  return (a: T[0], b: T[0]) => {
      /* next line works with strings and numbers, 
      * and you may want to customize it to your needs
      */
      let result;

      if (property === "rating") {
        result = (a[property].rate < b[property].rate) ? -1 : (a[property].rate > b[property].rate) ? 1 : 0;
        return result * sortOrder;
      }

      if (property === "purchases") {
        result = (a["rating"].count < b["rating"].count) ? -1 : (a["rating"].count > b["rating"].count) ? 1 : 0;
        return result * sortOrder;
      }

      result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;;

      return result * sortOrder;
  }
}