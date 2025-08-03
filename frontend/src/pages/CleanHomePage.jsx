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
    features: ['AI-powered separation', 'High quality output', 'Multiple formats']
  },
  {
    title: 'Pitch & Tempo',
    description: 'Adjust pitch and tempo independently with professional quality',
    path: '/pitch-tempo',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    features: ['Independent control', 'Real-time preview', 'Quality preservation']
  },
  {
    title: 'Format Converter',
    description: 'Convert between audio formats with customizable quality settings',
    path: '/format-converter',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    features: ['All formats supported', 'Batch processing', 'Quality options']
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
    features: ['Visual waveform', 'Precision cutting', 'Easy joining']
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
    features: ['Smart noise detection', 'Adjustable strength', 'Crystal clear results']
  }
]

const CleanHomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CleanHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Professional Audio
                <span className="text-blue-600 block">Processing Suite</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                Transform your audio with our advanced processing tools. Remove vocals, adjust pitch, 
                convert formats, edit precisely, and enhance quality - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CleanButton size="lg" as={Link} to="/tools">
                  Explore All Tools
                </CleanButton>
                <CleanButton variant="outline" size="lg" as={Link} to="/about">
                  Learn More
                </CleanButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Audio Processing Tools
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Choose from our collection of professional-grade audio tools, 
                each designed for specific processing needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CleanCard className="h-full">
                    <CleanCardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {tool.icon}
                        <CleanCardTitle className="ml-3 mb-0">
                          {tool.title}
                        </CleanCardTitle>
                      </div>
                      <CleanCardDescription className="mb-4">
                        {tool.description}
                      </CleanCardDescription>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <CleanButton 
                        variant="outline" 
                        className="w-full"
                        as={Link}
                        to={tool.path}
                      >
                        Try {tool.title}
                      </CleanButton>
                    </CleanCardContent>
                  </CleanCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose OdoRemover?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">Process audio files quickly with optimized algorithms</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">High Quality</h3>
                <p className="text-slate-600 dark:text-slate-400">Professional-grade processing that preserves audio fidelity</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Secure & Private</h3>
                <p className="text-slate-600 dark:text-slate-400">Your files are processed securely and deleted automatically</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default CleanHomePage