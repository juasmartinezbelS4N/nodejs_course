import http from "http"
import { usersAPI } from "./src/api/users.js"
import { hobbiesAPI } from "./src/api/hobbies.js"
import { returnInvalidPageError } from "./src/api/utils.js"

const API_URL = "/api/users"
const API_URL_REGEX_USER = /^\/api\/users\/([A-Za-z0-9-_]+)$/
const API_URL_REGEX_HOBBIES = /^\/api\/users\/([A-Za-z0-9-_]+)\/hobbies$/

const validateURL = (url) => {
  return !url.includes(API_URL)
}

const server = http.createServer((req, res) => {
  const { url } = req
  if (validateURL(url)) {
    returnInvalidPageError(res)
    return
  }

  if (url === API_URL) {
    usersAPI(req, res)
  } else if (API_URL_REGEX_USER.test(url)) {
    usersAPI(req, res)
  } else if (API_URL_REGEX_HOBBIES.test(url)) {
    hobbiesAPI(req, res)
  } else {
    returnInvalidPageError(res)
  }
})

server.listen(8000, () => {
  console.log("Server is running on port 8000")
})
