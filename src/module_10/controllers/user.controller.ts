import {
  SignInResponse,
  SignUpResponse,
  Request,
  Response,
  UserRegisterData,
} from "../types"
import * as UserService from "../services/user.service"
import { logger } from "../logger"

export const register = async (req: Request, res: Response) => {
  const response: SignUpResponse = {
    data: null,
    error: null,
  }
  try {
    const { email, password, role } = req.body
    const userData: UserRegisterData = { email, password, role }
    if (await UserService.userByEmailExists(email)) {
      response.error = { message: "User Already Exist. Please Login" }
      return res.status(409).send()
    }

    const newUser = await UserService.register(userData)
    if (newUser) {
      response.data = { id: newUser.id, email, role: newUser.role }
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = { message: "Internal Server Error" }
    res.status(500).send(response)
  }
}

export const login = async (req: Request, res: Response) => {
  const response: SignInResponse = {
    data: null,
    error: null,
  }

  try {
    const { email, password } = req.body

    const token = await UserService.login(email, password)

    if (!token) {
      response.error = { message: "No user with such email or password" }
      return res.status(404).json(response)
    }
    response.data = {
      token: token,
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = { message: "Internal Server Error" }
    res.status(500).send(response)
  }
}
