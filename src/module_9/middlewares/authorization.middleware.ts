import * as jwt from "jsonwebtoken"
import { Request, Response, Next } from "../types"
import { getUser } from "../repositories/user.repository"

function setErrorResponse(message: string) {
  return {
    data: null,
    error: {
      message: message,
    },
  }
}

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: Next
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    const response = setErrorResponse("Token is required")
    return res.status(401).json(response)
  }

  const [token] = authHeader.split(" ")

  try {
    const { user_id } = <jwt.JwtPayload>(
      jwt.verify(token, process.env.TOKEN_KEY!)
    )
    const user = await getUser(user_id)
    const { role } = <jwt.JwtPayload>jwt.verify(token, process.env.TOKEN_KEY!)

    if (!user || role !== "admin") {
      const response = setErrorResponse("You must be authorized user")
      return res.status(403).json(response)
    }
  } catch (err) {
    const response = setErrorResponse("You must be authorized user")
    return res.status(401).json(response)
  }

  return next()
}
