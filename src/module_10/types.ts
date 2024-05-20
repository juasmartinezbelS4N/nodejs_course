import express from "express"
import { ProductEntity } from "./database/schemas/product.entity"
import { CartEntity } from "./database/schemas/cart.entity"
import { OrderEntity } from "./database/schemas/order.entity"
import { UserEntity } from "./database/schemas/user.entity"

type Nullable<T> = T | null
export type NullablePromise<T> = Promise<T | null>

export type ResponseError = Nullable<{
  message: string
}>

export type Express = express.Express
export type Next = express.NextFunction
export type Request = express.Request
export type Response = express.Response

export type UserRegisterData = Pick<UserEntity, "email" | "password" | "role">

/** Responses and Requests **/

export type SingleProductResponse = {
  data?: Nullable<ProductEntity>
  error?: ResponseError
}

export type ProductsResponse = {
  data: Nullable<ProductEntity[] | ProductEntity>
  error?: ResponseError
}

export type CartResponse = {
  data: Nullable<{
    cart: CartEntity
    total: number
  }>
  error?: ResponseError
}

export type CheckoutResponse = {
  data: Nullable<{
    order: OrderEntity
  }>
  error?: ResponseError
}

export type SignUpResponse = {
  data: Nullable<{
    id: string
    email: string
    role: "admin" | "user"
  }>
  error: ResponseError
}

export type SignInResponse = {
  data: Nullable<{
    token: string
  }>
  error: ResponseError
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
