import { randomUUID } from "crypto"
import { addOrder } from "../repositories/order.respository"
import { getCarts, deleteCart } from "../repositories/cart.respository"
import { getTotalPrice } from "./cart.service"
import { Order } from "../types"

const GENERIC_ORDER = {
  payment: {
    type: "Paypal",
    address: "City",
    creditCard: "24601",
  },
  delivery: {
    type: "post",
    address: "City",
  },
  comments: "This order is an order",
  status: "created",
}

export const checkoutOrder = (userId: string): Order | null | undefined => {
  const cart = getCarts().find((cart) => cart.userId == userId)
  if (!cart) return null
  if (cart.items.length === 0) return null
  const { id: cartId, items } = cart
  const order: Order = {
    id: randomUUID(),
    userId,
    cartId,
    items: structuredClone(items),
    total: getTotalPrice(items),
    ...GENERIC_ORDER
  }
  addOrder(order)
  deleteCart(cartId)
  return order
}
