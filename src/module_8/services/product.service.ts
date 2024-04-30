import * as ProductRepository from "../repositories/product.repository"
import { Product } from "../database/entities/product"

export const getAllProducts = async () => {
  const products = await ProductRepository.getProducts()
  return <Product[]>products
}

export const getProductById = async (productId: string) => {
  const product = await ProductRepository.getProduct(productId)
  return <Product>product
}
