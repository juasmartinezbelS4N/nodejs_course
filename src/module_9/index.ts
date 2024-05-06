import express from "express"
import router from "./router"
import { Express } from "./types"
import startMongo from "./database/mongoDB";

const app: Express = express()
startMongo();

app.use("/api", router)

app.listen(8000, () => {
  console.log("Server is running on port 8000")
})
