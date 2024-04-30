import { Entity, PrimaryKey, Property, ManyToOne, Enum } from "@mikro-orm/core"
import { User } from "./user"
import { Cart } from "./cart"

@Entity()
export class Order {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Cart, { updateRule: "set null" })
  cart!: Cart

  @Property()
  items?: string

  @Property()
  payment!: {
    type: string
    address?: string
    creditCard?: string
  }

  @Property()
  delivery!: {
    type: string
    address: string
  }

  @Property()
  comments!: string

  @Property()
  status = "created"

  @Property()
  total!: number
}
