const EQUIPMENT = [
  { id: 'Stove',           emoji: '🔥' },
  { id: 'Oven',            emoji: '⬛' },
  { id: 'Air Fryer',       emoji: '🌀' },
  { id: 'Microwave',       emoji: '📡' },
  { id: 'Slow Cooker',     emoji: '🫕' },
  { id: 'Pressure Cooker', emoji: '⚡' },
  { id: 'BBQ Grill',       emoji: '🍖' },
]

export default function EquipmentSelector({ selected, setSelected }) {
  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        What equipment do you have?
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EQUIPMENT.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
              selected.includes(item.id)
                ? 'border-brand-500 bg-orange-50 dark:bg-orange-900/20 text-brand-600 dark:text-brand-400'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span>{item.id}</span>
          </button>
        ))}
      </div>
    </div>
  )
}