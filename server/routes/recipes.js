import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { supabase } from '../services/supabase.js'

const router = express.Router()

// Get all saved recipes for the logged in user
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ recipes: data })

  } catch (error) {
    console.error('Get recipes error:', error)
    res.status(500).json({ error: 'Failed to fetch recipes' })
  }
})

// Save a recipe
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, cuisine, prep_time, cook_time, total_time, ingredients, instructions, equipment_used } = req.body

    const { data, error } = await supabase
      .from('saved_recipes')
      .insert({
        user_id: req.user.id,
        title,
        description,
        cuisine,
        prep_time,
        cook_time,
        total_time,
        ingredients,
        instructions,
        equipment_used,
      })
      .select()
      .single()

    if (error) throw error
    res.json({ recipe: data })

  } catch (error) {
    console.error('Save recipe error:', error)
    res.status(500).json({ error: 'Failed to save recipe' })
  }
})

// Delete a recipe
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)

    if (error) throw error
    res.json({ success: true })

  } catch (error) {
    console.error('Delete recipe error:', error)
    res.status(500).json({ error: 'Failed to delete recipe' })
  }
})

// Get a single recipe
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('saved_recipes')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single()

    if (error) throw error
    res.json({ recipe: data })

  } catch (error) {
    console.error('Get recipe error:', error)
    res.status(500).json({ error: 'Failed to fetch recipe' })
  }
})

export default router