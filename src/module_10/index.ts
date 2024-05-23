import express from "express"
import router from "./router"
import { Express, Response } from "./types"
import { logger, responseInterceptor } from "./logger"
import mongoose from "mongoose"
import startMongo from "./database/mongoDB"
import "dotenv/config"
import { Socket } from "net"

const { SERVER_PORT, NODE_ENV } = process.env
const healthStatusPositive = (res: Response, message: string) => {
  return res.status(200).json({
    error: null,
    data: {
      message,
    },
  })
}

const healthStatusNegative = (res: Response, message: string) => {
  return res.status(500).json({
    data: null,
    error: {
      message,
    },
  })
}

const app: Express = express()
startMongo()

app.use(responseInterceptor)

app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState
  switch (dbState) {
    case 1:
      healthStatusPositive(res, "Database is connected")
      return
    case 2:
      healthStatusPositive(res, "Database is connecting")
      return
    case 3:
      healthStatusNegative(res, "Database is disconnecting")
      return
    default:
      healthStatusNegative(res, "Database is disconnected")
      return
  }
})

app.use("/api", router)
const server = app.listen(SERVER_PORT, () => {
  logger.info(`Server is running on port ${SERVER_PORT}`)
  logger.info("node env", NODE_ENV)
})

let connections: Socket[] = []

server.on("connection", (connection) => {
  // register connections
  connections.push(connection)

  // remove/filter closed connections
  connection.on("close", () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    )
  })
})

function shutdown() {
  logger.info("Received kill signal, shutting down gracefully")

  server.close(() => {
    logger.info("Closed out remaining connections")
    process.exit(0)
  })

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    )
    process.exit(1)
  }, 20000)

  // end current connections
  connections.forEach((connection) => connection.end())

  // then destroy connections
  setTimeout(() => {
    connections.forEach((connection) => connection.destroy())
  }, 10000)
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
