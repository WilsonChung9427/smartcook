import { useState } from 'react'
import IngredientInput from '../components/recipe/IngredientInput'
import EquipmentSelector from '../components/recipe/EquipmentSelector'
import FilterSelector from '../components/recipe/FilterSelector'
import api from '../lib/api'

export default function Generate() {
  const [ingredients, setIngredients] = useState([])
  const [equipment, setEquipment] = useState([])
  const [timeFilter, setTimeFilter] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient')
      return
    }
    if (equipment.length === 0) {
      setError('Please select at least one equipment item')
      return
    }

    setError('')
    setLoading(true)
    setRecipe(null)
    setSaved(false)

    try {
      const { data } = await api.post('/generate', {
        ingredients,
        equipment,
        cuisine: cuisineFilter,
        timeLimit: timeFilter,
      })
      setRecipe(data.recipe)
    } catch (err) {
      setError('Failed to generate recipe. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!recipe) return
    setSaving(true)
    try {
      await api.post('/recipes', {
        title: recipe.title,
        description: recipe.description,
        cuisine: cuisineFilter,
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        total_time: recipe.totalTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        equipment_used: recipe.equipmentUsed,
      })
      setSaved(true)
    } catch (err) {
      setError('Failed to save recipe. Please try again.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generate a Recipe</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Tell us what you have and we'll create the perfect recipe for you.
        </p>
      </div>

      <div className="space-y-8">
        {/* Ingredients */}
        <div className="card">
          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
        </div>

        {/* Equipment */}
        <div className="card">
          <EquipmentSelector selected={equipment} setSelected={setEquipment} />
        </div>

        {/* Filters */}
        <div className="card">
          <FilterSelector
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            cuisineFilter={cuisineFilter}
            setCuisineFilter={setCuisineFilter}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-primary w-full py-4 text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Generating your recipe...
            </span>
          ) : '✨ Generate Recipe'}
        </button>

        {/* Recipe result */}
        {recipe && (
          <div className="card space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{recipe.title}</h2>
                <button
                  onClick={handleSave}
                  disabled={saved || saving}
                  className={`whitespace-nowrap text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                    saved
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'btn-primary'
                  }`}
                >
                  {saved ? '✓ Saved!' : saving ? 'Saving...' : '💾 Save Recipe'}
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{recipe.description}</p>

              {/* Time badges */}
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
                  Prep: {recipe.prepTime} min
                </span>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
                  Cook: {recipe.cookTime} min
                </span>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full font-semibold">
                  Total: {recipe.totalTime} min
                </span>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                    <span className="font-medium">{ing.amount} {ing.unit}</span>
                    <span>{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold text-xs">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}