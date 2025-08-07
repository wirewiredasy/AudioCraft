import React, { Component } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

// Error Boundary Component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={() => this.setState({ hasError: false, error: null, errorInfo: null })}
        />
      )
    }

    return this.props.children
  }
}

// Error Display Component
export const ErrorDisplay = ({ 
  error, 
  errorInfo, 
  onRetry, 
  type = 'error',
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  showDetails = false 
}) => {
  const typeStyles = {
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    network: 'border-orange-500/30 bg-orange-500/10'
  }

  const typeIcons = {
    error: AlertTriangle,
    warning: AlertTriangle,
    network: RefreshCw
  }

  const Icon = typeIcons[type]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className={`glass-card max-w-lg w-full text-center border-2 ${typeStyles[type]}`}>
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <Icon className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-300">{message}</p>
        </div>

        {showDetails && error && (
          <details className="text-left mb-6 bg-gray-800 rounded-lg p-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-400 mb-2">
              Error Details
            </summary>
            <pre className="text-xs text-red-400 overflow-auto">
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          )}
          <a
            href="/"
            className="flex items-center justify-center px-6 py-3 glass-button rounded-xl font-semibold transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            If this problem persists, please{' '}
            <a href="/support" className="text-blue-400 hover:text-blue-300 underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Inline Error Alert Component
export const ErrorAlert = ({ 
  error, 
  onDismiss, 
  type = 'error',
  className = '' 
}) => {
  const typeStyles = {
    error: 'alert-error',
    warning: 'bg-yellow-500/20 border-yellow-500/30',
    info: 'alert-info',
    success: 'alert-success'
  }

  const typeIcons = {
    error: AlertTriangle,
    warning: AlertTriangle,
    info: Bug,
    success: RefreshCw
  }

  const Icon = typeIcons[type]

  return (
    <div className={`${typeStyles[type]} flex items-start space-x-3 ${className}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{error}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// Network Error Handler
export const NetworkErrorHandler = ({ onRetry }) => (
  <ErrorDisplay
    type="network"
    title="Connection Problem"
    message="Unable to connect to our servers. Please check your internet connection and try again."
    onRetry={onRetry}
  />
)

// File Upload Error Handler
export const FileUploadError = ({ error, onRetry, onDismiss }) => {
  const getErrorMessage = (error) => {
    if (error.includes('size')) return 'File size too large. Please use a smaller file (max 100MB).'
    if (error.includes('format')) return 'Unsupported file format. Please use MP3, WAV, FLAC, or OGG files.'
    if (error.includes('network')) return 'Upload failed due to network error. Please try again.'
    return 'Upload failed. Please try again with a different file.'
  }

  return (
    <ErrorAlert
      error={getErrorMessage(error)}
      type="error"
      onDismiss={onDismiss}
      className="mb-4"
    />
  )
}

export default ErrorBoundary