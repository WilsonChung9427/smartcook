import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <div className="text-6xl mb-6">🍳</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Cook anything with
            <span className="text-brand-500"> what you have</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Tell us what ingredients are in your fridge, what equipment you own,
            and your cuisine preferences — we'll generate the perfect recipe just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? '/generate' : '/signup'}
              className="btn-primary text-base px-8 py-3"
            >
              Start Generating
            </Link>
            {!user && (
              <Link
                to="/login"
                className="btn-secondary text-base px-8 py-3"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            How it works
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Three simple steps to your next favourite meal
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🥕',
                title: 'Add your ingredients',
                description: 'Enter whatever you have in your fridge or pantry. No need to go shopping.',
              },
              {
                emoji: '🍳',
                title: 'Select your equipment',
                description: 'Tell us what you have — stove, oven, air fryer, slow cooker and more.',
              },
              {
                emoji: '✨',
                title: 'Get your recipe',
                description: 'Our AI generates a complete recipe with steps tailored to exactly what you have.',
              },
            ].map((step, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-orange-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything you need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🌍', title: '8 cuisines', description: 'Italian, Japanese, Mexican, Indian and more' },
              { emoji: '⏱️', title: 'Time filters', description: 'Under 15, 30, or 60 minutes' },
              { emoji: '💾', title: 'Save recipes', description: 'Keep your favourites for later' },
              { emoji: '📱', title: 'Mobile friendly', description: 'Cook with your phone in the kitchen' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-3xl mb-3">{feature.emoji}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to start cooking?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Join thousands of home cooks generating personalised recipes every day.
          </p>
          <Link
            to={user ? '/generate' : '/signup'}
            className="btn-primary text-base px-8 py-3"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  )
}