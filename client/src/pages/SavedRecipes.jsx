import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const { data } = await api.get('/recipes')
      setRecipes(data.recipes)
    } catch (err) {
      setError('Failed to load recipes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return
    try {
      await api.delete(`/recipes/${id}`)
      setRecipes(recipes.filter(r => r.id !== id))
    } catch (err) {
      alert('Failed to delete recipe')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Recipes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
        <Link to="/generate" className="btn-primary">
          + Generate New
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No saved recipes yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Generate your first recipe and save it here!
          </p>
          <Link to="/generate" className="btn-primary">
            Generate a Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div key={recipe.id} className="card hover:shadow-md transition-shadow flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-semibold text-gray-900 dark:text-white leading-snug">
                    {recipe.title}
                  </h2>
                  {recipe.cuisine && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full whitespace-nowrap">
                      {recipe.cuisine}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {recipe.description}
                </p>
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>⏱ {recipe.total_time} min</span>
                  <span>🔪 Prep: {recipe.prep_time} min</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="flex-1 text-center text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                >
                  View Recipe
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}