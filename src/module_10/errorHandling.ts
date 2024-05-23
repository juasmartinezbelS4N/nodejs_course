import { Next, Request, Response, ResponseError } from "./types"
import { logger } from "./logger"
import joi from "joi"

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: Next
) => {
  logger.error(err.message) // Log the error for debugging purposes
  const response: {data: null, error: ResponseError} = {
    data: null,
    error: null
  }

  if (err instanceof joi.ValidationError) {
    response.error = { message: err.message}
    return res.status(400).json(response)
  }

  response.error = { message: 'Internal Server Error' }
  return res.status(500).json(response)
}
