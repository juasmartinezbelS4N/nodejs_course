import express from "express"
import router from "./router"
import { Express } from "./types"

const app: Express = express()

app.use("/api", router)

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})
