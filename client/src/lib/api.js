import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
})

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token
  console.log('Token being sent:', token ? 'exists' : 'MISSING')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api