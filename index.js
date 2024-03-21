import http from "http"
import { usersAPI } from "./src/api/users.js"
import { hobbiesAPI } from "./src/api/hobbies.js"
import { returnInvalidPageError } from "./src/api/utils.js"

const API_URL = "/api/users"

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
  } else {
    const parsedUrl = url.split("/")
    const baseUrl = `/${parsedUrl[1]}/${parsedUrl[2]}`
    if (baseUrl !== API_URL) {
      returnInvalidPageError(res)
      return
    }

    if (parsedUrl.length === 4) {
      usersAPI(req, res)
    } else if (parsedUrl.length === 5 && parsedUrl[4] === "hobbies") {
      hobbiesAPI(req, res)
    } else {
      returnInvalidPageError(res)
    }
  }
})

server.listen(8000, () => {
  console.log("Server is running on port 8000")
})
