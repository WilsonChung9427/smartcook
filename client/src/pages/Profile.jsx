import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../lib/api'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [recipeCount, setRecipeCount] = useState(0)

  useEffect(() => {
    fetchRecipeCount()
  }, [])

  const fetchRecipeCount = async () => {
    try {
      const { data } = await api.get('/recipes')
      setRecipeCount(data.recipes.length)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile</h1>

      {/* User info card */}
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.email}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Member since {new Date(user?.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-brand-500">{recipeCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {recipeCount === 1 ? 'Recipe Saved' : 'Recipes Saved'}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-brand-500">🍳</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Cooking!</p>
          </div>
        </div>
      </div>

      {/* Account section */}
      <div className="card mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
          Account
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Account type</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Free</span>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="w-full py-3 rounded-lg border-2 border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
      >
        Sign out
      </button>
    </div>
  )
}