
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Music, VolumeX, Repeat, Settings, Edit3, Shield, Play } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: VolumeX,
      title: 'Vocal Remover',
      description: 'Remove vocals from any song using AI-powered audio separation',
      gradient: 'from-red-500 to-pink-600',
      path: '/vocal-remover'
    },
    {
      icon: Repeat,
      title: 'Pitch & Tempo',
      description: 'Adjust pitch and tempo independently without quality loss',
      gradient: 'from-blue-500 to-cyan-600',
      path: '/pitch-tempo'
    },
    {
      icon: Settings,
      title: 'Format Converter',
      description: 'Convert between all major audio formats with high quality',
      gradient: 'from-green-500 to-emerald-600',
      path: '/converter'
    },
    {
      icon: Edit3,
      title: 'Audio Editor',
      description: 'Cut, join, and edit audio files with precision timing',
      gradient: 'from-purple-500 to-violet-600',
      path: '/editor'
    },
    {
      icon: Shield,
      title: 'Noise Reduction',
      description: 'Remove background noise and enhance audio clarity',
      gradient: 'from-orange-500 to-red-600',
      path: '/noise-reduction'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium">
              <Music className="w-4 h-4 mr-2" />
              Professional Audio Processing Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              AudioStudio
              <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent block">
                Pro
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced audio processing tools powered by AI. Remove vocals, adjust pitch, 
              convert formats, and enhance your audio with professional-grade quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/vocal-remover"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Start Processing
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                View Features
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Audio Tools
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for professional audio processing in one platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={feature.path}
                    className="block p-8 h-full group cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center mt-6 text-red-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Try Now
                      <Play className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-white">AudioStudio Pro</span>
          </div>
          <p className="text-gray-400">
            Professional audio processing made simple. Built with modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  )
}
