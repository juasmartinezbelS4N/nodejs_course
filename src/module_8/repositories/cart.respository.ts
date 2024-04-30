import { LoadStrategy } from "@mikro-orm/core"
import { randomUUID } from "crypto"
import { DI } from "../index"
import { Cart } from "../database/entities/cart"
import { User } from "../database/entities/user"

export const getCarts = async () => {
  return await DI.cartRepository.findAll()
}

export const getCart = async (userId?: string) => {
  return await DI.orm.em.findOne(
    Cart,
    { user: userId },
    {
      populate: ["items", "items.product"],
      strategy: LoadStrategy.JOINED,
    }
  )
}

export const addCart = async (user: User) => {
  const newCart = new Cart()
  newCart.user = user
  await DI.orm.em.persistAndFlush(newCart)
  return newCart
}

export const updateCart = async (cart: Cart) => {
  await DI.orm.em.persist(cart).flush()
  return cart
}

export const deleteCart = async (cart: Cart) => {
  return await DI.cartRepository.nativeDelete(cart)
}
