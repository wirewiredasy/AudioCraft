import React from 'react'

// Advanced Loading Spinner with multiple variants
export const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  showText = false,
  text = 'Processing...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'border-blue-500',
    secondary: 'border-purple-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    danger: 'border-red-500',
    white: 'border-white'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-600 rounded-full`}></div>
        {/* Inner spinning ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent ${colorClasses[variant]} border-t-transparent rounded-full animate-spin`}></div>
        {/* Center dot with pulse */}
        <div className={`absolute inset-0 ${sizeClasses[size]} flex items-center justify-center`}>
          <div className={`w-2 h-2 ${colorClasses[variant].replace('border-', 'bg-')} rounded-full animate-pulse`}></div>
        </div>
      </div>
      {showText && (
        <p className="text-sm font-medium text-gray-300 animate-pulse">{text}</p>
      )}
    </div>
  )
}

// Audio Processing Specific Loading Animation
export const AudioProcessingLoader = ({ progress = 0, stage = 'Analyzing' }) => {
  const stages = [
    'Analyzing audio...',
    'Processing frequencies...',
    'Separating tracks...',
    'Optimizing quality...',
    'Finalizing output...'
  ]

  return (
    <div className="glass-card max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="relative w-20 h-20 mx-auto">
          {/* Audio wave visualization */}
          <div className="absolute inset-0 flex items-center justify-center space-x-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-pulse`}
                style={{
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
          {/* Progress circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(107, 114, 128, 0.3)"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{stage}</h3>
      <p className="text-sm text-gray-400 mb-4">Please wait while we process your audio...</p>
      
      {/* Progress bar */}
      <div className="progress-bar mb-4">
        <div 
          className="progress-fill transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Stage indicators */}
      <div className="flex justify-between text-xs text-gray-500">
        {stages.map((stageText, index) => (
          <div
            key={index}
            className={`flex-1 text-center px-2 ${
              stages.indexOf(stage + '...') === index ? 'text-blue-400 font-medium' : ''
            }`}
          >
            <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
              stages.indexOf(stage + '...') >= index ? 'bg-blue-400' : 'bg-gray-600'
            }`} />
            {stageText.split('...')[0]}
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton Loading for cards
export const CardSkeleton = ({ count = 1 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="glass-card animate-pulse">
        <div className="w-16 h-16 bg-gray-700 rounded-2xl mb-6 mx-auto" />
        <div className="h-4 bg-gray-700 rounded mb-2" />
        <div className="h-3 bg-gray-700 rounded w-3/4 mb-4" />
        <div className="h-8 bg-gray-700 rounded" />
      </div>
    ))}
  </div>
)

// Page Loading Animation
export const PageLoader = () => (
  <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        {/* Animated ODOREMOVER logo placeholder */}
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
        <div className="absolute inset-2 border-4 border-purple-500/50 rounded-full animate-pulse" />
        <div className="absolute inset-4 border-4 border-pink-500/70 rounded-full animate-spin" />
        <div className="absolute inset-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>
      <h2 className="text-2xl font-bold mb-2">ODOREMOVER</h2>
      <p className="text-gray-400">Loading audio suite...</p>
    </div>
  </div>
)

export default LoadingSpinner