type FakestoreAPIResponse = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {rate: number, count: 120}
  title: string
}

type CartItem = Omit<FakestoreAPIResponse, "category" | "id"> & { quantity: number }

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type {FakestoreAPIResponse, CartItem};