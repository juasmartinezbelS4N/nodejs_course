import express from "express"
import { Product } from "./database/entities/product"
import { Cart } from "./database/entities/cart"
import { Order } from "./database/entities/order"

type Nullable<T> = T | null
export type NullablePromise<T> = Promise<T | null>

export type ResponseError = Nullable<{
  message: string
}>

export type Express = express.Express
export type Next = express.NextFunction
export type Request = express.Request
export type Response = express.Response

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
