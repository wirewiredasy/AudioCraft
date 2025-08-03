import React from 'react'

const CleanCard = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div 
      className={`
        bg-white dark:bg-slate-800 
        border border-slate-200 dark:border-slate-700 
        rounded-xl shadow-sm
        ${hover ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600' : ''}
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

const CleanCardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  )
}

const CleanCardContent = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
}

const CleanCardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 dark:text-white ${className}`}>
      {children}
    </h3>
  )
}

const CleanCardDescription = ({ children, className = '' }) => {
  return (
    <p className={`text-sm text-slate-600 dark:text-slate-400 mt-1 ${className}`}>
      {children}
    </p>
  )
}

export { CleanCard, CleanCardHeader, CleanCardContent, CleanCardTitle, CleanCardDescription }