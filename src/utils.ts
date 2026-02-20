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