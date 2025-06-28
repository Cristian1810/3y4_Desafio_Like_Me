import { createUserModel, findUserByEmailModel } from "../models/usuariosModel.js"
import jwt from "jsonwebtoken"


const JWTSECRET = process.env.JWTSECRET

export const registerUserController = async (req, res) => {
try {
    const { email, password, rol, lenguage } = req.body
    if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ message: "Faltan datos obligatorios" })
    }
    const user = await createUserModel(email, password, rol, lenguage)
    res.status(201).json({ message: "Usuario creado correctamente", user })
} catch (error) {
    console.error("Error al crear el usuario:", error)
    res.status(500).json({ message: "Error al crear el usuario", error: error.message })
}
}

export const getUserController = async (req, res) => {
    try {
        console.log("Paso 1: Inicio getUserController")
        const authHeader = req.headers.authorization
        if (!authHeader) {
            console.log("Paso 2: No authHeader")
            return res.status(401).json({ message: "Token no proporcionado" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            console.log("Paso 3: No token")
            return res.status(401).json({ message: "Token no válido" })
        }
        const decoded = jwt.verify(token, JWTSECRET)
        console.log("Paso 4: Token decodificado", decoded)
        const user = await findUserByEmailModel(decoded.email)
        console.log("Paso 5: Resultado de findUserByEmailModel", user)
        if (!user) {
            console.log("Paso 6: Usuario no encontrado")
            return res.status(404).json({ message: "Usuario no encontrado" })
        }

        console.log("Paso 7: Usuario encontrado, enviando respuesta")
        res.status(200).json({ user })
        
    } catch (error) {
        console.error("Error en getUserController:", error, error.stack)
        res.status(401).json({ message: "Token inválido o expirado", error: error.message })
    }
}