import { Request, Response } from "express"
import * as CartService from "../services/cart.service"
import { getProductById } from "../services/product.service"
import * as OrderService from "../services/order.service"
import { updateUserOrder } from "../repositories/user.repository"
import { CartEntity } from "../database/schemas/cart.entity"
import { OrderEntity } from "../database/schemas/order.entity"
import { CartResponse, CheckoutResponse, DeleteResponse } from "../types"
import { logger } from "../logger"

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

export const getCart = async (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!

  const cart = await CartService.getCartByUserId(userId)
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

export const putCart = async (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!
  const body = req.body
  logger.info(body)
  if (!body) {
    return res.status(400).json(setResponse("Products are not valid"))
  }

  if (!getProductById(body.productId)) {
    return res.status(404).json(setResponse("Product not found"))
  }

  const cart = <CartEntity>await CartService.updateUserCart(userId, body)
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

export const deleteCart = async (req: Request, res: Response) => {
  const userId = getUserId(req.headers["x-user-id"])!
  const deleted = await CartService.deleteUserCart(userId)
  const response: DeleteResponse = {
    data: {
      success: deleted,
    },
    error: null,
  }
  return res.status(200).json(response)
}

export const checkoutCart = async (req: Request, res: Response) => {
  const xUserId = req.headers["x-user-id"]
  const userId = getUserId(xUserId)!

  const order = await OrderService.checkoutOrder(userId)
  if (!order) {
    return res.status(400).json(setResponse("There is no order in cart"))
  }
  await CartService.deleteUserCart(userId)
  await updateUserOrder(userId, order)
  const response = setResponse(null, {
    order: <OrderEntity>order,
  })
  return res.status(200).json(response)
}
