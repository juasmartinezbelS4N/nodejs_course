import { EntityManager } from "@mikro-orm/core"
import { Seeder } from "@mikro-orm/seeder"
import { User } from "../entities/user"
import { Product } from "../entities/product"

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      id: "3e999371-d6d0-463c-8d9d-ac864098f8bb",
      name: "Admin",
      email: "admin@admin.com",
    })
    em.create(Product, {
      id: "e3fe8888-37b5-4a45-af72-23d16ee9b42f",
      title: "Book",
      description: "Interesting book",
      price: 200,
    })
    em.create(Product, {
      id: "5fd8db65-d395-4294-bcd9-772ca190726c",
      title: "Pen",
      description: "Cute pen",
      price: 20,
    })
    em.create(Product, {
      id: "2364b3a6-0d12-4f54-8eb0-09ca12e1972e",
      title: "Noteboook",
      description: "Usefull notebook",
      price: 50,
    })
  }
}
