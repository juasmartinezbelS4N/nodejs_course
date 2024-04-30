import {
  Entity,
  PrimaryKey,
  OneToMany,
  OneToOne,
  Collection,
  Property,
} from "@mikro-orm/core"
import { Cart } from "./cart"
import { Order } from "./order"

@Entity()
export class User {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string

  @Property()
  name!: string

  @Property()
  email!: string

  @OneToOne(() => Cart, (cart) => cart.user, { owner: true })
  cart?: Cart

  @OneToMany(() => Order, (order) => order.user)
  orders = new Collection<Order>(this)
}
