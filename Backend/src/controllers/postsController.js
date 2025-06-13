import { getPostsModel, createPostModel, likePostModel, deletePostModel } from "../models/postsModel.js"

// Primera parte del Desafio
//Get
export const getPostsController = async (req, res) => {
    try {
        const posts = await getPostsModel()
        res.json(posts)
    } catch (error) {
        res.json({
            message: "Error al obtener los posts",
            error: error.message
        })
    }
}

//Post
export const createPostController = async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        const nuevoPost = await createPostModel({ titulo, url, descripcion })
        res.json({ post: nuevoPost})
    } catch (error) {
        res.json({ error: "Error en crear el post" })
        console.error("Error al crear el post:", error)
    }
}


// Segunda parte del Desafio
// Put
export const likePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const [post] = await likePostModel(id);
        res.json(post);
    } catch (error) {
        res.json({ error: "Error al dar like" });
    }
};

// Delete
export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Intentando eliminar post con id:", id);
        const postEliminado = await deletePostModel(id);
        if (postEliminado.length > 0) {
            res.json({ message: "Post eliminado", post: postEliminado[0] });
        } else {
            res.json({ message: "Post no encontrado" });
        }
    } catch (error) {
        console.error("Error real al eliminar el post:", error);
        res.json({ error: "Error al eliminar el post" });
    }
}

