import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"
import { ICartItem, CartItemSchema } from "./cartItem.document"

export interface IOrder extends Document {
  _id: string
  userId: string
  cartId: string
  items: ICartItem[]
  payment: {
    type: string
    address?: string
    creditCard?: string
  }
  delivery: {
    type: string
    address: string
  }
  comments: string
  status: string
  total: number
}

export const OrderSchema = new Schema<IOrder>({
  _id: { type: String, default: randomUUID },
  userId: { type: String, default: randomUUID, ref: "User", required: true },
  cartId: { type: String, default: randomUUID, ref: "Cart", required: true },
  items: [CartItemSchema],
  payment: {
    type: { type: String, required: true },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
})

export default mongoose.model<IOrder>("Order", OrderSchema)
