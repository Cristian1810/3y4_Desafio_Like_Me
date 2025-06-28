import jwt from "jsonwebtoken"

export const validateToken = (req, res, next) => {
const authHeader = req.headers.authorization
if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" })
}
const token = authHeader.split(" ")[1]
console.log("Token recibido:", token)
console.log("JWTSECRET al verificar:", process.env.JWTSECRET)
try {
    const decoded = jwt.verify(token, process.env.JWTSECRET)
    req.user = decoded
    next()
} catch (error) {
    console.error("Error al verificar token:", error)
    return res.status(401).json({ message: "Token inválido o expirado" })
}
}