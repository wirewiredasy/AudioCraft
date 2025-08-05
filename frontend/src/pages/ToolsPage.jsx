import React from 'react'
import { Link } from 'react-router-dom'
import { CleanCard, CleanCardContent, CleanCardTitle, CleanCardDescription } from '../components/ui/CleanCard'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'Remove vocals from songs using advanced AI separation technology',
    path: '/vocal-remover',
    icon: '🎤'
  },
  {
    title: 'Pitch & Tempo',
    description: 'Adjust pitch and tempo independently with professional quality',
    path: '/pitch-tempo',
    icon: '🎵'
  },
  {
    title: 'Format Converter',
    description: 'Convert between audio formats with customizable quality settings',
    path: '/format-converter',
    icon: '🔄'
  },
  {
    title: 'Audio Editor',
    description: 'Cut, join, and edit audio files with precision and visual feedback',
    path: '/audio-editor',
    icon: '✂️'
  },
  {
    title: 'Noise Reduction',
    description: 'Remove background noise and enhance audio clarity professionally',
    path: '/noise-reduction',
    icon: '🔇'
  }
]

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Audio Processing Tools
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Professional audio processing tools for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <CleanCard key={tool.title} className="h-full">
              <CleanCardContent className="p-6">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <CleanCardTitle className="mb-2">{tool.title}</CleanCardTitle>
                <CleanCardDescription className="mb-4">{tool.description}</CleanCardDescription>
                <Link 
                  to={tool.path}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Now
                </Link>
              </CleanCardContent>
            </CleanCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToolsPage