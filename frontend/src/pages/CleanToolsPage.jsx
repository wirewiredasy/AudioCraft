import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CleanCard, CleanCardContent, CleanCardTitle, CleanCardDescription } from '../components/ui/CleanCard'
import CleanButton from '../components/ui/CleanButton'
import CleanHeader from '../components/CleanHeader'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'Remove vocals from songs using advanced AI separation technology',
    path: '/vocal-remover',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728m-5.657-2.829a3 3 0 010-4.242M12 8v8" />
      </svg>
    ),
    features: ['AI-powered separation', 'High quality audio', 'Multiple formats'],
    category: 'AI Processing',
    color: 'blue'
  },
  {
    title: 'Pitch & Tempo Adjuster',
    description: 'Change pitch and tempo independently with professional quality',
    path: '/pitch-tempo',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    features: ['Independent control', 'Real-time preview', 'No quality loss'],
    category: 'Audio Effects',
    color: 'green'
  },
  {
    title: 'Format Converter',
    description: 'Convert between all popular audio formats with perfect quality',
    path: '/format-converter',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    features: ['All formats supported', 'Batch conversion', 'Quality presets'],
    category: 'Conversion',
    color: 'purple'
  },
  {
    title: 'Audio Editor',
    description: 'Cut, join, and edit audio files with precision and visual feedback',
    path: '/audio-editor',
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-7-1V8a3 3 0 016 0v6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Visual waveform', 'Precision cutting', 'Easy joining'],
    category: 'Editing',
    color: 'orange'
  },
  {
    title: 'Noise Reduction',
    description: 'Remove background noise and enhance audio clarity professionally',
    path: '/noise-reduction',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-1v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-1c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-1" />
      </svg>
    ),
    features: ['Smart detection', 'Adjustable strength', 'Crystal clear results'],
    category: 'Enhancement',
    color: 'red'
  }
]

const categories = [...new Set(tools.map(tool => tool.category))]

const CleanToolsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CleanHeader />
      
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Audio Processing Tools
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Professional-grade audio tools for all your processing needs. 
              From vocal removal to format conversion, we've got you covered.
            </p>
          </motion.div>

          {/* Category Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <div key={category} className="text-center">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {tools.filter(tool => tool.category === category).length}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {category}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CleanCard className="h-full group">
                  <CleanCardContent className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${tool.color}-100 text-${tool.color}-800 dark:bg-${tool.color}-900/20 dark:text-${tool.color}-300`}>
                        {tool.category}
                      </span>
                      <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                        {tool.icon}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <CleanCardTitle className="mb-3">
                      {tool.title}
                    </CleanCardTitle>
                    <CleanCardDescription className="mb-4">
                      {tool.description}
                    </CleanCardDescription>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <CleanButton 
                      as={Link}
                      to={tool.path}
                      className="w-full"
                      variant="outline"
                    >
                      Try {tool.title}
                    </CleanButton>
                  </CleanCardContent>
                </CleanCard>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <CleanCard className="max-w-2xl mx-auto">
              <CleanCardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Need Help Getting Started?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Check out our comprehensive guides and tutorials to make the most of our audio processing tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CleanButton as={Link} to="/help">
                    View Help Center
                  </CleanButton>
                  <CleanButton variant="outline" as={Link} to="/contact">
                    Contact Support
                  </CleanButton>
                </div>
              </CleanCardContent>
            </CleanCard>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default CleanToolsPage