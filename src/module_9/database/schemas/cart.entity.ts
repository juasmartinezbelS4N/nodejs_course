import { ProductEntity } from "./product.entity"

export interface CartItemEntity {
  product: ProductEntity
  count: number
}

export interface CartEntity {
  id: string
  items: CartItemEntity[]
  userId: string
}
