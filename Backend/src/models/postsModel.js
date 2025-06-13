import pool from "../../db/config.js"

//Primera parte del Desafio
//GET
export const getPostsModel = async () =>{
    const sqlQuery = 'SELECT * FROM posts ORDER BY likes DESC' 
    const response = await pool.query(sqlQuery)
    return response.rows
}

//Post
export const createPostModel = async ({ titulo, url, descripcion }) => {
    const sqlQuery = 'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *'
    const values = [titulo, url, descripcion]
    const response = await pool.query(sqlQuery, values)
    console.log('Post creado', response)
    return response.rows
}


//Segunda parte del Desafio
//Put
export const likePostModel = async (id) => {
    const sqlQuery = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *';
    const values = [id];
    const response = await pool.query(sqlQuery, values);
    return response.rows;
};

//Delete
export const deletePostModel = async (id) => {
    try {
        const sqlQuery = 'DELETE FROM posts WHERE id = $1 RETURNING *';
        const values = [id];
        const response = await pool.query(sqlQuery, values);
        return response.rows;
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        throw error; 
    }
}

