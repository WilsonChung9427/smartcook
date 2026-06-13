import { supabase } from '../services/supabase.js'

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  console.log('Auth header received:', authHeader ? 'exists' : 'MISSING')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  console.log('Token length:', token.length)
  
  const { data, error } = await supabase.auth.getUser(token)
  console.log('Supabase auth result:', data?.user?.email, error?.message)

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.user = data.user
  next()
}