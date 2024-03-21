import http from "http"
import { randomUUID } from "crypto"
import database from "./database.js"

export const parseRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = ""

    req.on("data", (chunk) => {
      body += chunk.toString()
      console.log(body)
    })

    req.on("end", () => {
      resolve(JSON.parse(body))
    })

    req.on("error", (error) => {
      reject(error)
    })
  })
}

export const createUser = (data) => {
  const userId = randomUUID()
  const user = {
    user: {
      ...data,
      id: userId,
    },
    links: {
      self: `/api/users/${userId}`,
      hobbies: `/api/users/${userId}/hobbies`,
    },
  }
  database.users.push(user)
  return parseData(user)
}

export const parseData = (data, error = null) => {
  return JSON.stringify({
    data,
    error,
  })
}

export const returnInvalidPageError = (
  res,
  error = JSON.stringify({ error: "Not found" })
) => {
  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(error)
}

export const returnInvalidMethodError = (res) => {
  res.writeHead(405, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Method Not Allowed" }))
}

export const returnWrongDataError = (res) => {
  res.writeHead(422, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ data: null, error: "Invalid data" }))
}

export const returnServerError = (res) => {
  res.writeHead(500, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Server error" }))
}
