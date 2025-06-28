import {Router} from "express"
import { registerUserController, getUserController } from "../src/controllers/usuariosController.js"
import { verifyCredentials } from "../src/middleware/verifyCredentials.js"
import { validateToken } from "../src/middleware/validateToken.js"

const router = Router()

router.post("/usuarios", verifyCredentials, registerUserController)
router.get("/usuarios", validateToken, getUserController)

export default router

