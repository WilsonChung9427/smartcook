const TIME_OPTIONS = [
  'Under 15 minutes',
  'Under 30 minutes',
  'Under 1 hour',
]

const CUISINE_OPTIONS = [
  'Any', 'Italian', 'Japanese', 'Chinese',
  'Korean', 'Mexican', 'Indian', 'Middle Eastern', 'American',
]

export default function FilterSelector({ timeFilter, setTimeFilter, cuisineFilter, setCuisineFilter }) {
  return (
    <div className="space-y-6">
      {/* Time filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          How much time do you have?
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setTimeFilter(prev => prev === option ? '' : option)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                timeFilter === option
                  ? 'border-brand-500 bg-orange-50 dark:bg-orange-900/20 text-brand-600 dark:text-brand-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cuisine preference
        </label>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setCuisineFilter(option === 'Any' ? '' : option)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                (option === 'Any' && !cuisineFilter) || cuisineFilter === option
                  ? 'border-brand-500 bg-orange-50 dark:bg-orange-900/20 text-brand-600 dark:text-brand-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}