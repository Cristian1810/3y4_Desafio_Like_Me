import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import postsRoutes from './routes/posts.routes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use('/posts' , postsRoutes)

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})
