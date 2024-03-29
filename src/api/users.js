import {
  returnInvalidMethodError,
  parseRequestBody,
  returnServerError,
  createUser,
  parseData,
  returnInvalidPageError,
  returnBadRequestError,
} from "./utils.js"
import database from "./database.js"

export const usersAPI = (req, res) => {
  const { url, method, headers } = req
  switch (method) {
    case "POST":
      if (url.split("/").length === 3) postUsers(req, res)
      else returnInvalidMethodError(res)
      return
    case "GET":
      if (url.split("/").length === 3) getUsers(req, res)
      else returnInvalidMethodError(res)
      return
    case "DELETE":
      deleteUsers(req, res)
      return
    default:
      returnInvalidMethodError(res)
      return
  }
}

export const postUsers = async (req, res) => {
  const reqBody = await parseRequestBody(req)
  if (!reqBody) {
    returnServerError(res)
    return
  }
  if (!reqBody.name || !reqBody.email) {
    returnBadRequestError(res)
    return
  }
  res.writeHead(201, { "Content-Type": "application/json" })
  const user = createUser(reqBody)
  res.end(user)
}

export const getUsers = (_req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Cache-Control": "max-age=3600",
  })
  res.end(parseData(database.users))
}

export const deleteUsers = (req, res) => {
  const userId = req.url.split("/")[3]
  if (!userId) {
    returnInvalidMethodError(res)
    return
  }
  const newUsers = []
  const { users } = database
  users.forEach((ogUser) => {
    if (ogUser.user.id !== userId) newUsers.push(ogUser)
  })

  if (users.length === newUsers.length) {
    returnInvalidPageError(
      res,
      parseData(null, `User with id ${userId} doesn't exist`)
    )
    return
  }
  database.users = newUsers
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(parseData({ success: true }))
}
