import { CartEntity } from "./cart.entity"
import { OrderEntity } from "./order.entity"

export type UserEntity = {
  id: string
  email: string
  password: string
  role: 'admin' | 'user'
  cart?: CartEntity
  orders?: OrderEntity[]
}
