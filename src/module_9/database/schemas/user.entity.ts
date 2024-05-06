import { CartEntity } from "./cart.entity"
import { OrderEntity } from "./order.entity"

export type UserEntity = {
  id: string
  name: string
  email: string
  cart?: CartEntity
  orders?: OrderEntity[]
}

export const user: UserEntity = {
  id: "3e999371-d6d0-463c-8d9d-ac864098f8bb",
  email: "sadmin@test.com",
  name: "Super Admin",
}
