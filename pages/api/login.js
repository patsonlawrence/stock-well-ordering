import jwt from 'jsonwebtoken'
import { query } from '../../lib/db.js' // your DB query helper

const SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key'

function getMidnightExpiry() {
  const now = new Date()
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0, 0
  )
  return Math.floor(midnight.getTime() / 1000)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' })
  }

  try {
    // Query user by username
    const users = await query(`
      SELECT * FROM Users
      WHERE UserName = @username
    `, { username })

    const user = users[0]

    if (!user) {
      return res.status(401).json({ message: 'Invalid username' })
    }

    if (user.Password !== password) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // Calculate expiresIn for JWT
    const nowInSeconds = Math.floor(Date.now() / 1000)
    const expiresIn = getMidnightExpiry() - nowInSeconds

    // Create JWT payload
    const payload = {
      id: user.ID,
      username: user.UserName,
      role: user.UserRoleID,
    }

    // Sign token with expiry at midnight
    const token = jwt.sign(payload, SECRET, { expiresIn })

    // Respond with token
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: payload,
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
