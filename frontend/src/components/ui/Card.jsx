import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
      "bg-surface rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
))

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-4", className)}
    {...props}
  >
    {children}
  </div>
))

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
  >
    {children}
  </div>
))

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold text-text-primary", className)}
    {...props}
  >
    {children}
  </h3>
))

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-text-secondary mt-1.5", className)}
    {...props}
  >
    {children}
  </p>
))

Card.displayName = "Card"
CardHeader.displayName = "CardHeader"
CardContent.displayName = "CardContent"
CardTitle.displayName = "CardTitle"
CardDescription.displayName = "CardDescription"

export { Card, CardHeader, CardContent, CardTitle, CardDescription }