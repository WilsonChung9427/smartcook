import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import recipeRoutes from './routes/recipes.js'
import generateRoutes from './routes/generate.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

// Routes
app.use('/api/recipes', recipeRoutes)
app.use('/api/generate', generateRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})