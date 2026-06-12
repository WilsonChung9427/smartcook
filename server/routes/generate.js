import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { generateRecipe } from '../services/openai.js'

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
  try {
    const { ingredients, equipment, cuisine, timeLimit } = req.body

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'At least one ingredient is required' })
    }

    if (!equipment || equipment.length === 0) {
      return res.status(400).json({ error: 'At least one equipment item is required' })
    }

    const recipe = await generateRecipe({ ingredients, equipment, cuisine, timeLimit })
    res.json({ recipe })

  } catch (error) {
    console.error('Generate error:', error)
    res.status(500).json({ error: 'Failed to generate recipe' })
  }
})

export default router