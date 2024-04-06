import { randomUUID } from "crypto"
import * as CartRepository from "../repositories/cart.respository"
import { getProduct } from "../repositories/product.repository"
import { Cart, CartItem, UpdateCartBody } from "../types"

export const getTotalPrice = (items: CartItem[]) => {
  let totalPrice = 0
  for (const item of items) {
    totalPrice += item.count * item.product.price
  }
  return totalPrice
}

export const getCartByUserId = (userId: string): Cart | undefined => {
  const cart = CartRepository.getCart(userId)
  if (cart) {
    return cart
  } else {
    const newCart: Cart = {
      id: randomUUID(),
      userId: userId,
      items: [],
    }
    CartRepository.addCart(newCart)
    return newCart
  }
}

export const updateUserCart = (
  userId: string,
  body: UpdateCartBody
): Cart | null => {
  const cart = CartRepository.getCart(userId)
  if (!cart) return null

  let { items: cartItems } = cart
  const cartItem = cartItems.find((item) => item.product.id == body.productId)

  if (cartItem) {
    if (body.count === 0) {
      cartItems = cartItems.filter((item) => item.product.id != body.productId)
      cart.items = cartItems
    } else {
      cartItem.count = body.count
    }
  } else {
    const product = getProduct(body.productId)
    if (product && body.count !== 0) {
      cartItems.push({ product: product, count: body.count })
    }
  }
  return CartRepository.updateCart(cart)
}

export const deleteUserCart = (userId: string): boolean => {
  const cart = CartRepository.getCart(userId)
  if (cart) {
    return CartRepository.deleteCart(cart.id)
  } else {
    return false
  }
}
