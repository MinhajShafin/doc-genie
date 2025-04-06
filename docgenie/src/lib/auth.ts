import jwt from 'jsonwebtoken'

const SECRET = 'supersecret123' // Change in production

export const signToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}
