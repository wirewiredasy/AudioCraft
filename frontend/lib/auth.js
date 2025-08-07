import { db } from '../server/db.ts'
import { users, sessions } from '../shared/schema'
import { eq } from 'drizzle-orm'

// Authentication utilities
export class AuthService {
  static async createUser(userData) {
    try {
      const [user] = await db.insert(users).values({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl
      }).returning()
      
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async getUserByEmail(email) {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email))
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  static async updateUser(userId, updateData) {
    try {
      const [user] = await db.update(users)
        .set({
          ...updateData,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId))
        .returning()
      
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async deleteUser(userId) {
    try {
      await db.delete(users).where(eq(users.id, userId))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Session management
  static async createSession(sessionData) {
    try {
      await db.insert(sessions).values(sessionData)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async getSession(sessionId) {
    try {
      const [session] = await db.select().from(sessions).where(eq(sessions.sid, sessionId))
      return session
    } catch (error) {
      console.error('Error fetching session:', error)
      return null
    }
  }

  static async deleteSession(sessionId) {
    try {
      await db.delete(sessions).where(eq(sessions.sid, sessionId))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}

// Rate limiting for authentication attempts
export class AuthRateLimiter {
  constructor() {
    this.attempts = new Map()
    this.maxAttempts = 5
    this.windowMs = 15 * 60 * 1000 // 15 minutes
  }

  isAllowed(identifier) {
    const now = Date.now()
    const userAttempts = this.attempts.get(identifier) || []
    
    // Remove expired attempts
    const validAttempts = userAttempts.filter(
      timestamp => now - timestamp < this.windowMs
    )
    
    if (validAttempts.length >= this.maxAttempts) {
      return {
        allowed: false,
        retryAfter: Math.ceil((validAttempts[0] + this.windowMs - now) / 1000)
      }
    }
    
    // Add current attempt
    validAttempts.push(now)
    this.attempts.set(identifier, validAttempts)
    
    return { allowed: true }
  }
}

export const authRateLimiter = new AuthRateLimiter()

export default AuthService