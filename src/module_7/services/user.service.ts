import { getUser } from "../repositories/user.repository"

export const userExists = async (userId: string) => {
  return !!(await getUser(userId))
}
