import { DI } from "../index"

export const getUsers = async () => {
  return await DI.userRepository.findAll()
}

export const getUser = async (id: string) => {
  return await DI.userRepository.findOne(id)
}
