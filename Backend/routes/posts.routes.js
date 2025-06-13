import { Router } from "express"
import { getPostsController, createPostController, likePostController, deletePostController } from "../src/controllers/postsController.js"

const router = Router()

// Primera parte del Desafio
router.get("/", getPostsController)
router.post("/", createPostController)

// Segunda parte del Desafio
router.put("/posts/like/:id", likePostController);
router.delete("/:id", deletePostController)



export default router