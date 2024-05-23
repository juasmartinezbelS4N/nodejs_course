import mongoose, { ConnectOptions } from "mongoose"
import * as ProductEntities from "./schemas/product.entity"
import Product from "./documents/product.document"
import { logger } from "../logger"
import "dotenv/config"

const startMongo = () => {
  const uri: string = `mongodb://localhost:${process.env.DB_PORT}`
  const options: ConnectOptions = {
    dbName: process.env.DB_NAME,
    user: process.env.USER_ROOT,
    pass: process.env.SECRET_KEY,
  }

  mongoose
    .connect(uri, options)
    .then(() => {
      logger.info("Succesfully connected to MongoDB")
    })
    .then(() => {
      Product.insertMany([
        {
          _id: ProductEntities.book.id,
          ...ProductEntities.book,
        },
        {
          _id: ProductEntities.pen.id,
          ...ProductEntities.pen,
        },
        {
          _id: ProductEntities.notebook.id,
          ...ProductEntities.notebook,
        },
      ])
      logger.info("Products successfully created")
    })
    .catch((error: Error) => {
      logger.error(`Error connecting to MongoDB: ${error.message}`)
    })
}

export default startMongo
