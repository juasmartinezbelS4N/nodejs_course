import { Product } from "../types"
import database from "../database"

export const getProducts = (): Product[] => {
  return database.products
}

export const getProduct = (id: string): Product | undefined => {
  const product = database.products.find((product) => product.id == id)
  return product || undefined
}
