import mongoose, { ConnectOptions } from "mongoose"
import * as UserEntities from "./schemas/user.entity"
import * as ProductEntities from "./schemas/product.entity"
import User from "./documents/user.document"
import Product from "./documents/product.document"
import 'dotenv/config'


const startMongo = () => {
  const uri: string = `mongodb://localhost:${process.env.DB_PORT}`
  const options: ConnectOptions = {
    dbName: process.env.DB_NAME,
    user: process.env.USER_ROOT,
    pass: process.env.SECRET_KEY,
  }

  console.log('options', options)
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log("Succesfully connected to MongoDB")
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
      console.log("Products successfully created")
    })
    .catch((error: Error) => {
      console.log(`Error connecting to MongoDB: ${error.message}`)
    })
}

export default startMongo
