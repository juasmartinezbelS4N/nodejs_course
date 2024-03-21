import {
  returnInvalidMethodError,
  returnInvalidPageError,
  parseData,
  returnServerError,
  returnWrongDataError,
  parseRequestBody,
} from "./utils.js"
import database from "./database.js"

export const hobbiesAPI = (req, res) => {
  const { method } = req
  switch (method) {
    case "PATCH":
      patchHobbies(req, res)
      return
    case "GET":
      getHobbies(req, res)
      return
    default:
      returnInvalidMethodError(res)
      return
  }
}

const _findByUserById = (userId) => {
  if (!userId) return null
  for (const data of database.users) {
    if (data.user.id === userId) return data
  }
  return null
}

export const patchHobbies = async (req, res) => {
  const { url } = req
  const userId = url.split("/")[3]
  const data = _findByUserById(userId)
  if (!data) {
    returnInvalidPageError(
      res,
      parseData(null, `User with id ${userId} doesn't exist`)
    )
    return
  }
  const reqBody = await parseRequestBody(req)
  if (!reqBody) {
    returnServerError(res)
    return
  }
  const reqHobbies = reqBody.hobbies
  if (!reqHobbies) {
    returnWrongDataError(res)
    return
  }
  const userHobbies = data.user.hobbies || []
  const newHobbies = [...userHobbies, ...reqHobbies]
  data.user.hobbies = [...new Set(newHobbies)]

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(parseData({ hobbies: data.user.hobbies, links: data.links }))
}

export const getHobbies = (req, res) => {
  const { url } = req
  const userId = url.split("/")[3]
  const data = _findByUserById(userId)
  if (!data) {
    returnInvalidPageError(
      res,
      parseData(null, `User with id ${userId} doesn't exist`)
    )
    return
  }
  const hobbies = data.user.hobbies || []
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Cache-Control": "max-age=3600",
  })
  res.end(parseData({ hobbies, links: data.links }))
}
