// File validation utilities
export const validateAudioFile = (file) => {
  const errors = []
  const maxSize = 100 * 1024 * 1024 // 100MB
  const allowedTypes = [
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave',
    'audio/flac', 'audio/ogg', 'audio/aac', 'audio/m4a',
    'audio/x-wav', 'audio/x-flac', 'audio/webm'
  ]
  
  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds the 100MB limit`)
  }
  
  // Check file type
  const isValidType = allowedTypes.includes(file.type) || 
    ['mp3', 'wav', 'flac', 'ogg', 'aac', 'm4a'].some(ext => 
      file.name.toLowerCase().endsWith(`.${ext}`)
    )
  
  if (!isValidType) {
    errors.push(`Invalid file format. Supported formats: MP3, WAV, FLAC, OGG, AAC, M4A`)
  }
  
  // Check if file is corrupted (basic check)
  if (file.size === 0) {
    errors.push('File appears to be empty or corrupted')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Rate limiting utilities
export class RateLimiter {
  constructor(maxRequests = 5, timeWindow = 60000) { // 5 requests per minute
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = new Map()
  }
  
  isAllowed(identifier = 'default') {
    const now = Date.now()
    const userRequests = this.requests.get(identifier) || []
    
    // Remove old requests outside the time window
    const validRequests = userRequests.filter(timestamp => 
      now - timestamp < this.timeWindow
    )
    
    if (validRequests.length >= this.maxRequests) {
      return {
        allowed: false,
        retryAfter: Math.ceil((validRequests[0] + this.timeWindow - now) / 1000)
      }
    }
    
    // Add current request
    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    
    return { allowed: true }
  }
  
  getRemainingRequests(identifier = 'default') {
    const now = Date.now()
    const userRequests = this.requests.get(identifier) || []
    const validRequests = userRequests.filter(timestamp => 
      now - timestamp < this.timeWindow
    )
    
    return Math.max(0, this.maxRequests - validRequests.length)
  }
}

// Form validation utilities
export const validateForm = (data, rules) => {
  const errors = {}
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field]
    const fieldErrors = []
    
    // Required validation
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push(`${field} is required`)
    }
    
    // Length validation
    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      fieldErrors.push(`${field} must be at least ${fieldRules.minLength} characters`)
    }
    
    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      fieldErrors.push(`${field} must not exceed ${fieldRules.maxLength} characters`)
    }
    
    // Pattern validation
    if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      fieldErrors.push(fieldRules.patternMessage || `${field} format is invalid`)
    }
    
    // Custom validation
    if (value && fieldRules.custom) {
      const customError = fieldRules.custom(value)
      if (customError) fieldErrors.push(customError)
    }
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Security utilities
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .trim()
    .slice(0, 1000) // Limit length
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Audio processing parameter validation
export const validateAudioParams = (params) => {
  const errors = []
  
  if (params.pitch !== undefined) {
    if (isNaN(params.pitch) || params.pitch < -12 || params.pitch > 12) {
      errors.push('Pitch must be between -12 and +12 semitones')
    }
  }
  
  if (params.tempo !== undefined) {
    if (isNaN(params.tempo) || params.tempo < 0.5 || params.tempo > 2.0) {
      errors.push('Tempo must be between 0.5x and 2.0x')
    }
  }
  
  if (params.volume !== undefined) {
    if (isNaN(params.volume) || params.volume < 0 || params.volume > 2.0) {
      errors.push('Volume must be between 0 and 2.0')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export default {
  validateAudioFile,
  RateLimiter,
  validateForm,
  sanitizeInput,
  validateEmail,
  validateUrl,
  validateAudioParams
}