import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"
import bcrypt from "bcrypt"
import { ICart, CartSchema } from "./cart.document"
import { IOrder, OrderSchema } from "./order.document"

export interface IUser extends Document {
  _id: string
  email: String
  password: string
  role: "admin" | "user"
  cart: ICart
  orders: IOrder[]
}

export const UserSchema = new Schema<IUser>({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true },
  password: {
    type: String,
    set: (value: string) => bcrypt.hashSync(value, 10),
  },
  role: { type: String, default: "user" },
  cart: CartSchema,
  orders: [OrderSchema],
})

export default mongoose.model<IUser>("User", UserSchema)
