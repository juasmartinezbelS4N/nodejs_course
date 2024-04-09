import { Router, json, urlencoded } from "express"
import joi from "joi"
import { Request, Response, Next } from "./types"
import { errorHandler } from "./errorHandling"
import { authorizeUser } from "./middleware"
import * as ProductController from "./controllers/product.controller"
import * as CartController from "./controllers/cart.controller"

export const productToPutSchema = joi
  .object({
    productId: joi.string().uuid().required(),
    count: joi.number().min(0).required(),
  })
  .required()

type Schema = joi.ObjectSchema<any>

const validation = (schema: Schema) => {
  return (req: Request, res: Response, next: Next) => {
    const { error } = schema.validate(req.body)
    const response = {
      data: null,
      error: { message: "Invalid data" },
    }
    if (error) {
      return res.status(400).json(response)
    }
    next()
  }
}

const router = Router()
router.use(authorizeUser)
router.use(json())
router.use(urlencoded({ extended: false }))

router.get("/profile/cart", CartController.getCart)
router.put(
  "/profile/cart",
  validation(productToPutSchema),
  CartController.putCart
)

router.delete("/profile/cart", CartController.deleteCart)
router.post("/profile/cart/checkout", CartController.checkoutCart)

router.get("/products", ProductController.getProducts)
router.get("/products/:productId", ProductController.getProductById)

router.use(errorHandler)

export default router
