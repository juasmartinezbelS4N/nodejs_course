import { Entity, PrimaryKey, ManyToOne, Property } from "@mikro-orm/core"
import { Product } from "./product"
import { Cart } from "./cart"

@Entity()
export class CartItem {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string

  @ManyToOne(() => Product)
  product!: Product

  @ManyToOne(() => Cart, { updateRule: "set null", deleteRule: "cascade" })
  cart!: Cart

  @Property()
  count!: number
}
