import * as UserRepository from "./user.repository"
import * as CartRepository from "./cart.respository"
import { Order } from "../database/entities/order"
import { CartItem } from "../database/entities/cartItem"
import { getTotalPrice } from "../services/cart.service"
import { DI } from "../index"

export const addOrder = async (userId: string) => {
  const user = await UserRepository.getUser(userId)
  if (!user) return null
  const cart = await CartRepository.getCart(userId)
  if (!cart) return null

  if (cart.items.length > 0) {
    const order: Order = new Order()
    order.user = user
    order.cart = cart
    await cart?.items.init()
    order.items = JSON.stringify(cart.items)
    order.payment = {
      type: "credit card",
    }
    order.delivery = {
      type: "post",
      address: "Bogota",
    }
    order.comments = ""
    order.status = "created"
    const items = cart.items;
    order.total = getTotalPrice(items)
    await DI.orm.em.persistAndFlush(cart)
    await DI.orm.em.persistAndFlush(order)

    return order
  }
  return null
}
