import { Request, Response } from "express"
import * as CartService from "../services/cart.service"
import {getProductById} from "../services/product.service"
import * as OrderService from "../services/order.service"
import { CartResponse, CheckoutResponse, DeleteResponse } from "../types"
import database from "../database"

const DEFAULT_RESPONSE: CheckoutResponse | CartResponse = {
  data: null,
  error: null,
}

const setResponse = (
  errorMessage: string | null,
  data?: CartResponse["data"] | CheckoutResponse["data"]
) => {
  if (errorMessage !== null) {
    return { ...DEFAULT_RESPONSE, error: { message: errorMessage } }
  }
  return { data, error: null }
}

const getUserId = (xUserId: string | string[] | undefined): string | null => {
  return typeof xUserId === "string" ? xUserId : xUserId![0]
}

export const getCart = (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!

  const cart = CartService.getCartByUserId(userId)
  if (!cart) {
    return res.status(404).json(setResponse("Cart not found"))
  }
  const total = CartService.getTotalPrice(cart.items)
  const response = setResponse(null, {
    cart,
    total,
  })
  return res.status(200).json(response)
}

export const putCart = (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!
  const body = req.body
  console.log(body)
  if (!body) {
    return res.status(400).json(setResponse("Products are not valid"))
  }

  if (!getProductById(body.productId)) {
    return res.status(404).json(setResponse("Product not found"))
  }

  const cart = CartService.updateUserCart(userId, body)
  if (!cart) {
    return res.status(404).json(setResponse("Cart was not found"))
  }
  const total = CartService.getTotalPrice(cart.items)
  const response = setResponse(null, {
    cart,
    total,
  })
  return res.status(200).json(response)
}

export const deleteCart = (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!
  const deleted = CartService.deleteUserCart(userId)
  const response: DeleteResponse = {
    data: {
      success: deleted,
    },
    error: null,
  }
  return res.status(200).json(response)
}

export const checkoutCart = (req: Request, res: Response) => {
  const xUserId = req.headers["x-user-id"]
  const userId = getUserId(xUserId)!

  const order = OrderService.checkoutOrder(userId)
  if (!order) {
    return res.status(400).json(setResponse("There is no order in cart"))
  }

  const response = setResponse(null, {
    order: order,
  })
  return res.status(200).json(response)
}
