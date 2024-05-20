import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"
import { IProduct, ProductSchema } from "./product.document"

export interface ICartItem extends Document {
  _id: string
  product: IProduct
  count: number
}

export const CartItemSchema = new Schema<ICartItem>({
  _id: { type: String, default: randomUUID },
  product: { type: ProductSchema, required: true },
  count: { type: Number, required: true },
})

export default mongoose.model<ICartItem>("CartItem", CartItemSchema)
