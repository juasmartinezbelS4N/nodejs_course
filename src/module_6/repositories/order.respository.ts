import { Order } from "../types"
import database from "../database"

export const addOrder = (order: Order) => {
  database.orders.push(order)
}
