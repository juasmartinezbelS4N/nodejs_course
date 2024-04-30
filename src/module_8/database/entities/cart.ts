import {
  Entity,
  PrimaryKey,
  OneToOne,
  OneToMany,
  Collection,
} from "@mikro-orm/core"
import { CartItem } from "./cartItem"
import { User } from "./user"

@Entity()
export class Cart {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string

  @OneToOne(() => User, (user) => user.cart)
  user!: User

  @OneToMany({ entity: () => CartItem, mappedBy: "cart", orphanRemoval: true })
  items = new Collection<CartItem>(this)
}
