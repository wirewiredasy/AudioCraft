import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { OdoremoverLogo } from './CustomIcons'

export const useResponsiveLayout = () => {
  const [screenSize, setScreenSize] = useState('desktop')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth
        if (width < 640) setScreenSize('mobile')
        else if (width < 1024) setScreenSize('tablet')
        else setScreenSize('desktop')
      }
    }

    updateScreenSize()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize)
      return () => window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  return {
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isSidebarOpen,
    setIsSidebarOpen
  }
}

export const ResponsiveContainer = ({ children, className = '' }) => {
  return (
    <div className={`
      container mx-auto px-4 
      sm:px-6 lg:px-8 
      max-w-7xl
      ${className}
    `}>
      {children}
    </div>
  )
}

export const ResponsiveGrid = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 6,
  className = '' 
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6'
  }

  return (
    <div className={`
      grid 
      ${gridCols[cols.mobile]} 
      sm:${gridCols[cols.tablet]} 
      lg:${gridCols[cols.desktop]}
      gap-${gap}
      ${className}
    `}>
      {children}
    </div>
  )
}

export const MobileHeader = ({ 
  title = 'ODOREMOVER', 
  onMenuClick, 
  showBackButton = false, 
  onBackClick,
  rightElement 
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBackButton ? (
            <button 
              onClick={onBackClick}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <OdoremoverLogo size={32} showText={false} />
          )}
          <span className="text-lg font-bold truncate">{title}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {rightElement}
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const ResponsiveSidebar = ({ 
  isOpen, 
  onClose, 
  children,
  width = 'w-64',
  className = ''
}) => {
  const { isMobile } = useResponsiveLayout()

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 
        ${isMobile ? 'w-full' : width}
        bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? '' : 'lg:translate-x-0 lg:static'}
        ${className}
      `}>
        {children}
      </div>
    </>
  )
}

export const AdaptiveButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  fullWidthOnMobile = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    secondary: 'glass-button',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button 
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidthOnMobile ? 'w-full sm:w-auto' : ''}
        rounded-xl font-semibold transition-all duration-300
        hover:scale-105 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export const ResponsiveCard = ({ 
  children, 
  padding = 'p-6',
  hover = true,
  className = '' 
}) => {
  return (
    <div className={`
      glass-card
      ${padding}
      ${hover ? 'hover:scale-105 hover:bg-white/15 cursor-pointer' : ''}
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  )
}

export const MobileOptimizedInput = ({ 
  label,
  error,
  helperText,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input 
        className={`
          w-full px-4 py-3
          bg-gray-800 border border-gray-700
          rounded-xl text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          text-base sm:text-sm
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export const ResponsiveModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`
          relative glass-card w-full ${sizes[size]}
          transform transition-all duration-300
          ${className}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default {
  useResponsiveLayout,
  ResponsiveContainer,
  ResponsiveGrid,
  MobileHeader,
  ResponsiveSidebar,
  AdaptiveButton,
  ResponsiveCard,
  MobileOptimizedInput,
  ResponsiveModal
}