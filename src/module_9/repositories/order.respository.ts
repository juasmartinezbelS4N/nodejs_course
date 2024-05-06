import * as UserRepository from "./user.repository"
import * as CartRepository from "./cart.respository"
import Order, { IOrder } from "../database/documents/order.document"
import { CartItemEntity } from "../database/schemas/cart.entity"
import * as CartService from "../services/cart.service"
import { NullablePromise } from "../types"


export const addOrder = async (userId: string): NullablePromise<IOrder> => {
  const user = await UserRepository.getUser(userId)
  if (!user) return null
  const cart = await CartRepository.getCart(userId)
  if (!cart) return null

  if (user && cart && cart.items.length > 0) {
    const order: IOrder = new Order({
      userId: user.id,
      cartId: cart.id,
      items: cart.items,
      payment: {
        type: "credit card",
      },
      delivery: {
        type: "post",
        address: "Bogota",
      },
      comments: "comment",
      status: "created",
      total: CartService.getTotalPrice(<CartItemEntity[]>cart.items),
    })
    return await order.save()
  }
  return null
}

