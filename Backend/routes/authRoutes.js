import { Router } from "express"
import { loginUserController } from "../src/controllers/authController.js"

const router = Router()

router.post("/login", loginUserController)

export default router