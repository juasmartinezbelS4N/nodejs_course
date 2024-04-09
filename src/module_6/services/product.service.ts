import * as ProductRepository from "../repositories/product.repository"

export const getAllProducts = () => {
  return ProductRepository.getProducts()
}

export const getProductById = (productId: string) => {
  return ProductRepository.getProduct(productId)
}
