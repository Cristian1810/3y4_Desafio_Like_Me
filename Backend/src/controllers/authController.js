import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { findUserByEmailModel } from "../models/usuariosModel.js"

const JWTSECRET = process.env.JWTSECRET 

export const loginUserController = async (req, res) => {
try {
    const { email, password } = req.body
    const user = await findUserByEmailModel(email)
    if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password)
    if (!isPasswordValid) {
    return res.status(401).json({ message: 'No autorizado' })
    }
    console.log("JWTSECRET al firmar:", process.env.JWTSECRET)
    const token = jwt.sign({ email }, process.env.JWTSECRET, { expiresIn: '1h' })
    res.status(200).json({ token })
} catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' })
}
}

