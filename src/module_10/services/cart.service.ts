import { UpdateCartBody } from "../types"
import { logger } from "../logger"
import * as CartRepository from "../repositories/cart.respository"
import { getProduct } from "../repositories/product.repository"
import { updateUser } from "../repositories/user.repository"
import User from "../database/documents/user.document"
import CartItem from "../database/documents/cartItem.document"
import { CartEntity, CartItemEntity } from "../database/schemas/cart.entity"

export const getTotalPrice = (items: CartItemEntity[]) => {
  let totalPrice = 0
  for (const item of items) {
    totalPrice += item.count * item.product.price
  }
  return totalPrice || 0
}

export const getCartByUserId = async (userId: string) => {
  const cart = await CartRepository.getCart(userId)
  if (cart) return <CartEntity>cart

  if (userId) {
    const user = await User.findById(userId)
    if (user) {
      return <CartEntity>await CartRepository.addCart(user)
    }
  }
  return null
}

export const updateUserCart = async (userId: string, body: UpdateCartBody) => {
  const cart = await CartRepository.getCart(userId)
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
    const product = await getProduct(body.productId)
    if (product && body.count !== 0) {
      const newCartItem = new CartItem({ product: product, count: body.count })
      cartItems.push(await newCartItem.save())
    }
  }
  await CartRepository.updateCart(cart)
  const updatedCart = await CartRepository.getCart(userId)
  await updateUser(userId, cart)
  return updatedCart
}

export const deleteUserCart = async (userId: string) => {
  const cart = await CartRepository.getCart(userId)
  if (cart) {
    logger.info('deleted', await CartRepository.deleteCart(cart))
    const updatedCart = await CartRepository.getCart(userId)
    if(updatedCart !== null) return false
    await updateUser(userId, {});
    return true
  }
  return false
}
