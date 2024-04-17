

export interface ProductEntity {
  id: string
  title: string
  description: string
  price: number
}

export const book: ProductEntity = {
  id: "e3fe5525-37b5-4a45-af72-23d16ee9b42f",
  title: "Book",
  description: "Interesting book",
  price: 200,
}

export const pen: ProductEntity = {
  id: "5fd8db65-d395-4294-bcd9-772ca190726c",
  title: "Pen",
  description: "Cute pen",
  price: 20,
}

export const notebook: ProductEntity = {
  id: "2364b3a6-0d12-4f54-8eb0-09ca12e1972e",
  title: "Noteboook",
  description: "Usefull notebook",
  price: 50,
}