import { Request, Response, NextFunction } from "express"
import { userExists } from "./services/user.service"

const ADMIN_HEADER = "admin"

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
  next: NextFunction
) => {
  const xUserId = req.headers["x-user-id"]
  if (!xUserId) {
    return res.status(401).json(setErrorResponse("User is not authorized"))
  }
  const userId = typeof xUserId === "string" ? xUserId : xUserId[0]

  if (await userExists(userId)) {
    next()
  } else {
    return res.status(403).json(setErrorResponse("You must be authorized user"))
  }
}
