import { useState } from 'react'

export default function IngredientInput({ ingredients, setIngredients }) {
  const [input, setInput] = useState('')

  const addIngredient = () => {
    const trimmed = input.trim().toLowerCase()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed])
      setInput('')
    }
  }

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter(i => i !== item))
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        What ingredients do you have?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addIngredient()}
          placeholder="e.g. chicken breast"
          className="input-field"
        />
        <button
          type="button"
          onClick={addIngredient}
          className="btn-primary px-4 py-2 whitespace-nowrap"
        >
          Add
        </button>
      </div>
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map(item => (
            <span
              key={item}
              className="flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm text-orange-800 dark:text-orange-300"
            >
              {item}
              <button
                type="button"
                onClick={() => removeIngredient(item)}
                className="ml-1 text-orange-600 hover:text-orange-900 dark:hover:text-orange-100 font-medium"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}