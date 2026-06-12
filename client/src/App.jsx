import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Generate from './pages/Generate'
import SavedRecipes from './pages/SavedRecipes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import RecipeDetail from './pages/RecipeDetail'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/generate" element={
            <ProtectedRoute><Generate /></ProtectedRoute>
          } />
          <Route path="/saved" element={
            <ProtectedRoute><SavedRecipes /></ProtectedRoute>
          } />
          <Route path="/recipe/:id" element={
            <ProtectedRoute><RecipeDetail /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  )
}