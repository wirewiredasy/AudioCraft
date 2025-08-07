import React, { useState } from 'react'
import { X, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import { ResponsiveModal, MobileOptimizedInput, AdaptiveButton } from './ResponsiveLayout'
import { validateForm, validateEmail } from './ValidationUtils'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorAlert } from './ErrorHandler'
import { AuthService, authRateLimiter } from '../lib/auth'

export const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validationRules = {
    email: {
      required: true,
      custom: (value) => !validateEmail(value) ? 'Please enter a valid email address' : null
    },
    firstName: currentMode === 'signup' ? { required: true, minLength: 2 } : {},
    lastName: currentMode === 'signup' ? { required: true, minLength: 2 } : {},
    password: {
      required: true,
      minLength: 8,
      custom: (value) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
        return null
      }
    },
    confirmPassword: currentMode === 'signup' ? {
      required: true,
      custom: (value) => value !== formData.password ? 'Passwords do not match' : null
    } : {}
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setMessage('')

    // Rate limiting check
    const rateLimitResult = authRateLimiter.isAllowed(formData.email)
    if (!rateLimitResult.allowed) {
      setErrors({ general: `Too many attempts. Please try again in ${rateLimitResult.retryAfter} seconds.` })
      return
    }

    // Validate form
    const validation = validateForm(formData, validationRules)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)

    try {
      if (currentMode === 'login') {
        // In a real implementation, this would make an API call
        // For demo purposes, we'll simulate authentication
        const user = await AuthService.getUserByEmail(formData.email)
        if (user) {
          setMessage('Login successful! Welcome back.')
          setTimeout(() => {
            onClose()
            window.location.reload() // Simple refresh for demo
          }, 1000)
        } else {
          setErrors({ general: 'Invalid email or password' })
        }
      } else {
        // Sign up
        const result = await AuthService.createUser({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          profileImageUrl: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=6366f1&color=fff`
        })

        if (result.success) {
          setMessage('Account created successfully! You can now sign in.')
          setCurrentMode('login')
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))
        } else {
          setErrors({ general: result.error || 'Failed to create account' })
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setCurrentMode(currentMode === 'login' ? 'signup' : 'login')
    setErrors({})
    setMessage('')
    setFormData({
      email: formData.email, // Keep email when switching
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={currentMode === 'login' ? 'Sign In to ODOREMOVER' : 'Create Your Account'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success/Error Messages */}
        {message && (
          <div className="alert-success flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>{message}</span>
          </div>
        )}

        {errors.general && (
          <ErrorAlert error={errors.general} type="error" />
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {currentMode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileOptimizedInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName?.[0]}
                disabled={isLoading}
              />
              <MobileOptimizedInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName?.[0]}
                disabled={isLoading}
              />
            </div>
          )}

          <MobileOptimizedInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email?.[0]}
            disabled={isLoading}
          />

          <MobileOptimizedInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password?.[0]}
            helperText={currentMode === 'signup' ? 'Must be at least 8 characters with uppercase, lowercase, and number' : ''}
            disabled={isLoading}
          />

          {currentMode === 'signup' && (
            <MobileOptimizedInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword?.[0]}
              disabled={isLoading}
            />
          )}
        </div>

        {/* Submit Button */}
        <AdaptiveButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidthOnMobile
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner size="sm" variant="white" />
              <span>Processing...</span>
            </div>
          ) : (
            currentMode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </AdaptiveButton>

        {/* Switch Mode */}
        <div className="text-center">
          <p className="text-gray-400">
            {currentMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={switchMode}
              disabled={isLoading}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors disabled:opacity-50"
            >
              {currentMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Terms for signup */}
        {currentMode === 'signup' && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </form>
    </ResponsiveModal>
  )
}

export default AuthModal