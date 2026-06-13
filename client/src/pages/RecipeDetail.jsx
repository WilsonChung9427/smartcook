import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkedIngredients, setCheckedIngredients] = useState([])

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      const { data } = await api.get(`/recipes/${id}`)
      setRecipe(data.recipe)
    } catch (err) {
      setError('Failed to load recipe')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return
    try {
      await api.delete(`/recipes/${id}`)
      navigate('/saved')
    } catch (err) {
      alert('Failed to delete recipe')
      console.error(err)
    }
  }

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="card animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Recipe not found</h2>
        <Link to="/saved" className="btn-primary">Back to Saved Recipes</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* Back button */}
      <Link
        to="/saved"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        ← Back to Saved Recipes
      </Link>

      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {recipe.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{recipe.description}</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            🗑 Delete
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-4">
          {recipe.cuisine && (
            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
              {recipe.cuisine}
            </span>
          )}
          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
            Prep: {recipe.prep_time} min
          </span>
          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
            Cook: {recipe.cook_time} min
          </span>
          <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full font-semibold">
            Total: {recipe.total_time} min
          </span>
        </div>

        {/* Equipment used */}
        {recipe.equipment_used && recipe.equipment_used.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Equipment used:</p>
            <div className="flex flex-wrap gap-2">
              {recipe.equipment_used.map(eq => (
                <span key={eq} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full">
                  {eq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Two column layout on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ingredients */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ingredients
          </h2>
          <p className="text-xs text-gray-400 mb-3">Tap to check off as you go</p>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                onClick={() => toggleIngredient(i)}
                className={`flex items-center gap-3 text-sm cursor-pointer transition-opacity ${
                  checkedIngredients.includes(i) ? 'opacity-40 line-through' : ''
                }`}
              >
                <span className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  checkedIngredients.includes(i)
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {checkedIngredients.includes(i) && '✓'}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Instructions
          </h2>
          <ol className="space-y-5">
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
    </div>
  )
}