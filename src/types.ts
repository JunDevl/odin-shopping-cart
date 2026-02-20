export type FakestoreAPIResponse = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {rate: number, count: 120}
  title: string
}

export type CartItem = Omit<FakestoreAPIResponse, "category"> & { quantity: number }

export type Sort = "title" | "price" | "category" | "rating" | "purchases"

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};