import mongoose, { ConnectOptions } from "mongoose"
import * as UserEntities from "./schemas/user.entity"
import * as ProductEntities from "./schemas/product.entity"
import User from "./documents/user.document"
import Product from "./documents/product.document"

const startMongo = () => {
  const uri: string = "mongodb://localhost:27017"
  const options: ConnectOptions = {
    dbName: "mydatabase",
    user: "root",
    pass: "nodegmp",
  }
  mongoose
    .connect(uri, options)
    .then(() => {
      console.log("Succesfully connected to MongoDB")
    })
    .then(() => {
      User.create({
        _id: UserEntities.user.id,
        ...UserEntities.user,
      })
      console.log("User successfully created")
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
