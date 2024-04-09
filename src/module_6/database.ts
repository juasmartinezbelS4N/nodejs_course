import { Cart, Order, Product, User } from "./types"


const book = {
  id: "e3fe5525-37b5-4a45-af72-23d16ee9b42f",
  title: "Book",
  description: "Interesting book",
  price: 200,
}

const pen = {
  id: "5fd8db65-d395-4294-bcd9-772ca190726c",
  title: "Pen",
  description: "Cute pen",
  price: 20,
}

const notebook = {
  id: "2364b3a6-0d12-4f54-8eb0-09ca12e1972e",
  title: "Noteboook",
  description: "Usefull notebook",
  price: 50,
}

const user1: User = {
  id: "3e999371-d6d0-463c-8d9d-ac864098f8bb",
  email: "sadmin@test.com",
  name: "Super Admin",
}

const user2: User = {
  id: "0511a108-568c-456c-b6e4-cfb5553fe1df",
  email: "admin@test.com",
  name: "Regular Admin",
}

const user3: User = {
  id: "34e03241-43f1-471b-8a2d-7111082e295b",
  email: "team@test.com",
  name: "Team Member",
}

const user4: User = {
  id: "401d6b03-ea82-492d-9eef-1f1f6d80fb04",
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