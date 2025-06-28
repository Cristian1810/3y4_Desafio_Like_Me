import pool from "../../db/config.js"
import bcryptjs from "bcryptjs"

export const createUserModel = async (email, password, rol, lenguage) => {
try {
    const hashedPassword = await bcryptjs.hash(password, 10)
    const sqlQuery = {
    text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage',
    values: [email, hashedPassword, rol, lenguage]
    }
    const result = await pool.query(sqlQuery)
    return result.rows[0]
} catch (error) {
    throw new Error("Error al crear usuario: " + error.message)
}
}

export const findUserByEmailModel = async (email) => {
try {
    const sqlQuery = {
      text: 'SELECT * FROM usuarios WHERE email = $1',
    values: [email]
    }
    const result = await pool.query(sqlQuery)
    return result.rows[0]
} catch (error) {
    throw new Error("Error al buscar usuario: " + error.message)
}
}