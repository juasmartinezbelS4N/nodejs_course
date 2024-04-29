import Product, { IProduct } from "../database/documents/product.document"
import { NullablePromise } from "../types"

export const getProducts = async (): NullablePromise<IProduct[]> => {
  return await Product.find()
}

export const getProduct = async (id: string): NullablePromise<IProduct> => {
  return await Product.findById(id)
}
