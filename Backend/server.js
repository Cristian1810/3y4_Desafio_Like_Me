import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import usuariosRoutes from './routes/usuariosRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { logger } from './src/middleware/logger.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())
app.use(logger)


app.use(authRoutes)
app.use(usuariosRoutes)

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})
