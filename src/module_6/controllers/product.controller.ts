import * as ProductService from "../services/product.service"
import { ProductsResponse, Request, Response } from "../types"

export const getProducts = async (_req: Request, res: Response) => {
  console.log("req", _req)
  console.log("res", res)
  const products = ProductService.getAllProducts()
  const response: ProductsResponse = {
    data: products,
    error: null,
  }
  return res.status(200).json(response)
}

export const getProductById = (req: Request, res: Response) => {
  const { productId } = req.params
  const product = ProductService.getProductById(productId)
  if (!product) {
    const response: ProductsResponse = {
      data: null,
      error: { message: "No product with such id" },
    }
    return res.status(404).json(response)
  }
  const response: ProductsResponse = {
    error: null,
    data: product,
  }
  return res.status(200).json(response)
}
