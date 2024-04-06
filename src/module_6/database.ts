import { Cart, Order, Product, User } from "./types"

const book = {
  id: "book",
  title: "Book",
  description: "Interesting book",
  price: 200,
}

const pen = {
  id: "pen",
  title: "Pen",
  description: "Cute pen",
  price: 20,
}

const notebook = {
  id: "notebook",
  title: "Noteboook",
  description: "Usefull notebook",
  price: 50,
}

const user1: User = {
  id: "sadmin",
  email: "sadmin@test.com",
  name: "Super Admin",
}

const user2: User = {
  id: "admin",
  email: "admin@test.com",
  name: "Regular Admin",
}

const user3: User = {
  id: "team",
  email: "team@test.com",
  name: "Team Member",
}

const user4: User = {
  id: "limited",
  email: "limited@test.com",
  name: "Limited Team Member",
}

let carts: Cart[] = []
let orders: Order[] = []
let users: User[] = [user1, user2, user3, user4]
let products: Product[] = [book, pen, notebook]

const database = {
  carts,
  orders,
  users,
  products,
}

export default database;