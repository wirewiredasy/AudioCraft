import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Volume2, Zap, FileAudio, Scissors, RotateCcw, ArrowRight, Code, Play } from 'lucide-react'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'AI-powered vocal separation using advanced center channel extraction',
    icon: Volume2,
    href: '/vocal-remover',
    gradient: 'bg-vocal-remover',
    status: 'available'
  },
  {
    title: 'Pitch & Tempo',
    description: 'Independent pitch and tempo adjustment with real-time controls',
    icon: Zap,
    href: '/pitch-tempo',
    gradient: 'bg-pitch-tempo',
    status: 'coming-soon'
  },
  {
    title: 'Format Converter',
    description: 'Support for all major audio formats with quality options',
    icon: FileAudio,
    href: '/converter',
    gradient: 'bg-format-converter',
    status: 'coming-soon'
  },
  {
    title: 'Audio Editor',
    description: 'Cut and join audio files with visual waveform editing',
    icon: Scissors,
    href: '/editor',
    gradient: 'bg-audio-editor',
    status: 'coming-soon'
  },
  {
    title: 'Noise Reduction',
    description: 'Advanced noise removal with adjustable strength settings',
    icon: RotateCcw,
    href: '/noise-reduction',
    gradient: 'bg-noise-reduction',
    status: 'coming-soon'
  },
  {
    title: 'API Access',
    description: 'Full REST API for developers and integrations',
    icon: Code,
    href: '/docs',
    gradient: 'bg-api-access',
    status: 'available'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-main custom-scrollbar">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-disney rounded-3xl mb-8 shadow-xl">
              <Music className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gradient-rainbow mb-8 leading-tight">
              Professional Audio Processing
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your audio with AI-powered tools. Remove vocals, adjust pitch and tempo, 
              convert formats, edit audio, and reduce noise with professional quality results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-netflix text-lg px-8 py-4 rounded-xl font-bold flex items-center gap-3"
                onClick={() => document.querySelector('.tools-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-5 h-5" />
                Get Started
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/docs"
                target="_blank"
                className="btn-ghost text-lg px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
              >
                <Code className="w-5 h-5" />
                API Documentation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tools Grid Section */}
      <section className="tools-section py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Powerful Audio Tools
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need for professional audio processing in one platform
            </p>
          </motion.div>

          <div className="tools-grid">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              const isAvailable = tool.status === 'available'
              
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="netflix-card glass-card overflow-hidden">
                    <div className={`absolute inset-0 ${tool.gradient} opacity-90 flex flex-col justify-between p-8`}>
                      <div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {tool.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                      <div className="mt-6">
                        {isAvailable ? (
                          <Link
                            to={tool.href}
                            className="block w-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 py-3 px-6 rounded-xl text-white font-semibold text-center transition-all duration-300 hover:scale-105"
                          >
                            {tool.title === 'API Access' ? 'View Docs' : 'Try Now'}
                          </Link>
                        ) : (
                          <div className="block w-full bg-white/10 border border-white/20 py-3 px-6 rounded-xl text-white/70 font-semibold text-center">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white mb-16">
              Why Choose AudioStudio?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-netflix rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Fast Processing</h3>
                <p className="text-white/70">
                  Lightning-fast audio processing with optimized algorithms
                </p>
              </div>
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-disney rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">High Quality</h3>
                <p className="text-white/70">
                  Professional-grade results with minimal quality loss
                </p>
              </div>
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 bg-vocal-remover rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Easy to Use</h3>
                <p className="text-white/70">
                  Intuitive interface designed for both beginners and pros
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}