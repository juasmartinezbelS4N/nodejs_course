import { addOrder } from "../repositories/order.respository"

export const checkoutOrder = async (userId: string) => {
  return await addOrder(userId)
}
