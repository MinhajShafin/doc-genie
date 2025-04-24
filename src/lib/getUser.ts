export const getUserFromToken = (): any | null => {
    if (typeof window === 'undefined') return null
  
    const token = localStorage.getItem('token')
    console.log('📦 Token in localStorage:', token)
  
    if (!token) return null
  
    try {
      const base64 = token.split('.')[1]
      const payload = JSON.parse(atob(base64))
      console.log('✅ Decoded payload:', payload)
      return payload
    } catch (err) {
      console.error('❌ Invalid token format:', err)
      return null
    }
  }