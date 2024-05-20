import { Router, json, urlencoded } from "express"
import joi from "joi"
import { Request, Response, Next } from "./types"
import { errorHandler } from "./errorHandling"
import { verifyToken } from "./middlewares/authentication.middleware"
import { authorizeUser } from "./middlewares/authorization.middleware"
import * as ProductController from "./controllers/product.controller"
import * as CartController from "./controllers/cart.controller"
import * as UserController from "./controllers/user.controller"

export const productToPutSchema = joi
  .object({
    productId: joi.string().uuid().required(),
    count: joi.number().min(0).required(),
  })
  .required()

export const userRegisterSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
  role: joi.string().required(),
})

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
router.use(json())
router.use(urlencoded({ extended: false }))

router.post(
  "/auth/register",
  validation(userRegisterSchema),
  UserController.register
)
router.post("/auth/login", UserController.login)

router.use(verifyToken)
router.get("/profile/cart", CartController.getCart)
router.put(
  "/profile/cart",
  validation(productToPutSchema),
  CartController.putCart
)

router.delete("/profile/cart", authorizeUser, CartController.deleteCart)
router.post("/profile/cart/checkout", CartController.checkoutCart)

router.get("/products", ProductController.getProducts)
router.get("/products/:productId", ProductController.getProductById)

router.use(errorHandler)

export default router
