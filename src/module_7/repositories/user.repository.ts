import User, { IUser } from "../database/documents/user.document"
import { ICart } from "../database/documents/cart.document"
import { NullablePromise } from "../types"
import { IOrder } from "../database/documents/order.document"

export const getUsers = async (): NullablePromise<IUser[]> => {
  return await User.find()
}

export const getUser = async (id: string): NullablePromise<IUser> => {
  return await User.findById(id)
}

export const updateUser = async (
  userId: string,
  cart: ICart | {}
): NullablePromise<IUser> => {
  return await User.findByIdAndUpdate(userId, { cart })
}

export const updateUserOrder = async (
  userId: string,
  order: IOrder
): NullablePromise<IUser> => {
  const user = await getUser(userId);
  const orders = user!.orders || [];
  orders.push(order)
  return await User.findByIdAndUpdate(userId, { orders })
}
