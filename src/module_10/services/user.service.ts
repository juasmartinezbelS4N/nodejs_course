import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import {
  getUser,
  addUser,
  getUserByEmail,
} from "../repositories/user.repository"
import { UserRegisterData } from "../types"

export const userExists = async (userId: string) => {
  return !!(await getUser(userId))
}

export const userByEmailExists = async (userId: string) => {
  return !!(await getUserByEmail(userId))
}

export const register = async (user: UserRegisterData) => {
  return await addUser(user)
}

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (!user) return
  const correctPassword = await bcrypt.compare(password, user.password)
  if (user && correctPassword) {
    const token = jwt.sign(
      { user_id: user._id, email, role: user.role },
      process.env.TOKEN_KEY!,
      {
        expiresIn: "2h",
      }
    )
    return token
  }
  return
}
