import Cart, { ICart } from "../database/documents/cart.document"
import { IUser } from "../database/documents/user.document"

export const getCarts = async (): Promise<ICart[]> => {
  return await Cart.find()
}

export const getCart = async (userId: string) => {
  return await Cart.findOne({ userId: userId })
    .populate({
      path: "items",
      model: "CartItem",
    })
    .exec()
}

export const addCart = async (user: IUser): Promise<ICart | null> => {
  const cart = new Cart({
    userId: user.id,
  })
  return await cart.save();
}

export const updateCart = async (cart: ICart): Promise<ICart | null> => {
  return await Cart.findByIdAndUpdate(cart.id, cart)
}

export const deleteCart = async (cart: ICart): Promise<ICart | null> => {
  return await Cart.findByIdAndDelete(cart._id)
}
