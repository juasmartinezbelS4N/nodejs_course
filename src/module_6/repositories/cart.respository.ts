import { Cart } from "../types"
import database from "../database"

const carts = database.carts

export function getCarts(): Cart[] {
  return carts
}

export const getCart = (userId: string): Cart | undefined => {
  const userCart = carts.find((cart) => cart.userId == userId)
  return userCart || undefined
}

export const updateCart = (cart: Cart): Cart => {
  for (const index in carts) {
    const currentCart = carts[index]
    if (currentCart.id === cart.id) {
      carts[index] = cart
      database.carts = carts
      return carts[index]
    }
  }
  throw new Error("Cart was not found")
}

export const addCart = (cart: Cart) => {
  carts.push(cart)
  database.carts = carts
}

export const deleteCart = (cartId: string): boolean => {
  const newCarts: Cart[] = []
  let wasDeleted = false
  for (const index in carts) {
    const currentCart = carts[index]
    if (currentCart.id !== cartId) {
    } else {
      wasDeleted = true
    }
  }
  database.carts = newCarts
  return wasDeleted
}
