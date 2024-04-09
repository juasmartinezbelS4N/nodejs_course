import { getUser } from "../repositories/user.repository"

export const userExists = (userId: string): boolean => {
  return !!getUser(userId)
}
