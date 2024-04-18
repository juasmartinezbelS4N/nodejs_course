import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"
import { ICart, CartSchema } from "./cart.document"
import { IOrder, OrderSchema } from "./order.document"

export interface IUser extends Document {
  _id: string
  name: String
  email: String
  cart: ICart
  orders: IOrder[]
}

export const UserSchema = new Schema<IUser>({
  _id: { type: String, default: randomUUID },
  name: { type: String },
  email: { type: String },
  cart: CartSchema,
  orders: [OrderSchema],
})

export default mongoose.model<IUser>("User", UserSchema)
