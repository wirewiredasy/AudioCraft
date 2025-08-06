
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, VolumeX, Music, Settings, Mic, Volume2, Scissors } from 'lucide-react'

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: <Music className="w-4 h-4" /> },
    { name: 'Vocal Remover', href: '/vocal-remover', icon: <VolumeX className="w-4 h-4" /> },
    { name: 'Pitch & Tempo', href: '/pitch-tempo', icon: <Volume2 className="w-4 h-4" /> },
    { name: 'Format Converter', href: '/converter', icon: <Settings className="w-4 h-4" /> },
    { name: 'Audio Editor', href: '/editor', icon: <Scissors className="w-4 h-4" /> },
    { name: 'Noise Reduction', href: '/noise-reduction', icon: <Mic className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <VolumeX className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                ODOREMOVER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <VolumeX className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ODOREMOVER</span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              © 2024 ODOREMOVER. Powered by AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
