import { Request, Response, Next } from "../types"
import * as jwt from "jsonwebtoken"

function setErrorResponse(message: string) {
  return {
    data: null,
    error: {
      message: message,
    },
  }
}

export async function verifyToken(req: Request, res: Response, next: Next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    const response = setErrorResponse("Token is required")
    return res.status(401).json(response)
  }

  const [tokenType, token] = authHeader.split(" ")

  if (tokenType !== "Bearer") {
    const response = setErrorResponse("Invalid token")
    return res.status(403).json(response)
  }

  const { user_id } = <jwt.JwtPayload>jwt.verify(token, process.env.TOKEN_KEY!)

  if (user_id) {
    return next()
  } else {
    const response = setErrorResponse("You must be authorized user")
    return res.status(403).json(response)
  }
}
