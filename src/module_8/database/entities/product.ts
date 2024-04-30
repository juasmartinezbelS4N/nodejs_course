import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export class Product {
  @PrimaryKey({ type: "uuid", defaultRaw: "uuid_generate_v4()" })
  id!: string

  @Property()
  title!: string

  @Property()
  description!: string

  @Property()
  price!: number
}
