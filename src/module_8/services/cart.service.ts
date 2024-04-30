import { UpdateCartBody } from "../types"
import { Collection } from "@mikro-orm/core";
import * as CartRepository from "../repositories/cart.respository"
import { getProduct } from "../repositories/product.repository"
import { getUser } from "../repositories/user.repository"
import { User } from "../database/entities/user"
import { CartItem } from "../database/entities/cartItem"
import { Cart } from "../database/entities/cart"

export const getTotalPrice = (items: Collection<CartItem, object>) => {
  let totalPrice = 0
  for (const item of items) {
    totalPrice += item.count * item.product.price
  }
  return totalPrice || 0
}

export const getCartByUserId = async (userId: string) => {
  console.log('getting into getCartByUserId')
  const cart = await CartRepository.getCart(userId)
  console.log('Cart', cart)
  if (cart) return <Cart>cart

  if (userId) {
    console.log('UserId', userId)
    const user = await getUser(userId)
    if (user) {
      return <Cart>await CartRepository.addCart(user)
    }
  }
  return null
}
export const updateUserCart = async (userId: string, body: UpdateCartBody) => {
  const cart = await CartRepository.getCart(userId)
  if (!cart) return null
  await cart?.items.init();

  let { items: cartItems } = cart
  const cartItem = cartItems.find((item) => item.product.id == body.productId)

  if (cartItem) {
    if (body.count === 0) {
      cart.items.remove(cartItem);
    } else {
      cartItem.count = body.count;
    }
  } else {
    const product = await getProduct(body.productId)
    if (product && body.count !== 0) {
      const newCartItem = new CartItem()
      newCartItem.product = product;
      newCartItem.count = body.count;
      cart.items.add(newCartItem);
    }
  }
  await CartRepository.updateCart(cart)
  const updatedCart = await CartRepository.getCart(userId)
  return updatedCart
}

export const deleteUserCart = async (userId: string) => {
  const cart = await CartRepository.getCart(userId)
  if (cart) {
    console.log('deleted', await CartRepository.deleteCart(cart))
    const updatedCart = await CartRepository.getCart(userId)
    if(updatedCart !== null) return false
    return true
  }
  return false
}

