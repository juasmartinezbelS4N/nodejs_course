import express from "express"

type Nullable<T> = T | null

export type ResponseError = Nullable<{
  message: string
}>

export type Express = express.Express
export type Next = express.NextFunction
export type Request = express.Request
export type Response = express.Response

export type User = {
  id: string
  name: string
  email: string
}

export type Product = {
  id: string
  title: string
  description: string
  price: number
}

export type CartItem = {
  product: Product
  count: number
}

export type Cart = {
  id: string
  items: CartItem[]
  userId: string
}

export type Order = {
  id: string
  userId?: string
  cartId: string
  items: CartItem[]
  payment: {
    type: string
    address: string
    creditCard: string
  }
  delivery: {
    type: string
    address: string
  }
  comments: string
  status: "created" | string
  total: number
}

/** Responses and Requests **/

export type SingleProductResponse = {
  data?: Nullable<Product>
  error?: ResponseError
}

export type ProductsResponse = {
  data: Nullable<Product[] | Product>
  error?: ResponseError
}

export type CartResponse = {
  data: Nullable<{
    cart: Cart
    total: number
  }>
  error?: ResponseError
}

export type CheckoutResponse = {
  data: Nullable<{
    order: Order
  }>
  error?: ResponseError
}

export type DeleteResponse = {
  data: Nullable<{
    success: boolean
  }>
  error?: ResponseError
}

export type UpdateCartBody = {
  productId: string
  count: number
}
