import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import http from 'http';
import {
  MikroORM,
  RequestContext,
  type PostgreSqlDriver,
  EntityManager,
  EntityRepository,
} from "@mikro-orm/postgresql"
import router from "./router"
import { Express } from "./types"
import config from "./database/config/orm.config"
import { Cart } from "./database/entities/cart"
import { CartItem } from "./database/entities/cartItem"
import { Order } from "./database/entities/order"
import { Product } from "./database/entities/product"
import { User } from "./database/entities/user"

export const DI = {} as {
  server: http.Server;
  orm: MikroORM
  em: EntityManager
  cartRepository: EntityRepository<Cart>
  cartItemRepository: EntityRepository<CartItem>
  orderRepository: EntityRepository<Order>
  productRepository: EntityRepository<Product>
  userRepository: EntityRepository<User>
}

const app: Express = express()
const port = process.env.SERVER_PORT || 8000

console.log("Starting index")
export const init = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
  DI.em = DI.orm.em;
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.cartItemRepository = DI.orm.em.getRepository(CartItem);
  DI.orderRepository = DI.orm.em.getRepository(Order);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.userRepository = DI.orm.em.getRepository(User);
  app.use(express.json());
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (_req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try endpoints!' }));
  app.use("/api", router)
  DI.server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})()
