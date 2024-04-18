import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"
import { ICartItem, CartItemSchema } from "./cartItem.document"
import { IUser } from "./user.document"

export interface ICart extends Document {
  _id: string
  userId: string | IUser["id"]
  items: ICartItem[]
}

export const CartSchema = new Schema<ICart>({
  _id: { type: String, default: randomUUID },
  userId: { type: String, default: randomUUID, ref: "User", required: true },
  items: [CartItemSchema],
})

export default mongoose.model<ICart>("Cart", CartSchema)
