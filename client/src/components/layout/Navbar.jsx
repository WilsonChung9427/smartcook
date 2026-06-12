import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="font-bold text-xl text-brand-500">SmartCook</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-brand-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/generate"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/generate') ? 'text-brand-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  Generate
                </Link>
                <Link
                  to="/saved"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/saved') ? 'text-brand-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  Saved Recipes
                </Link>
              </>
            )}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Profile
                </Link>
                <button onClick={handleSignOut} className="btn-secondary text-sm">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Home</Link>
            {user && (
              <>
                <Link to="/generate" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Generate</Link>
                <Link to="/saved" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Saved Recipes</Link>
                <Link to="/profile" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Profile</Link>
              </>
            )}
            {user ? (
              <button onClick={handleSignOut} className="text-sm font-medium px-2 py-1 text-left text-red-500">Sign out</button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Log in</Link>
                <Link to="/signup" className="btn-primary text-sm text-center" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}