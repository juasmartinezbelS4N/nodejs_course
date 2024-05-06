import * as ProductRepository from "../repositories/product.repository"
import { ProductEntity } from "../database/schemas/product.entity"

export const getAllProducts = async () => {
  const products = await ProductRepository.getProducts()
  return <ProductEntity[]>products
}

export const getProductById = async (productId: string) => {
  const product = await ProductRepository.getProduct(productId)
  return <ProductEntity>product
}
