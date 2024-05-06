import { CartItemEntity } from "./cart.entity"

export type OrderEntity = {
  id: string
  userId?: string
  cartId: string
  items: CartItemEntity[]
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
