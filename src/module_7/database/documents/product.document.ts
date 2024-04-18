import mongoose, { Schema, Document } from "mongoose"
import { randomUUID } from "crypto"

export interface IProduct extends Document {
  _id: string
  title: string
  description: string
  price: number
}

export const ProductSchema = new Schema<IProduct>({
  _id: { type: String, default: randomUUID },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
})

export default mongoose.model<IProduct>("Product", ProductSchema)
