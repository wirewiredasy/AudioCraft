import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Scissors, Volume2, FileAudio, Zap, RotateCcw, Code } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Home', href: '/', icon: Music },
  { name: 'Vocal Remover', href: '/vocal-remover', icon: Volume2 },
  { name: 'Pitch & Tempo', href: '/pitch-tempo', icon: Zap },
  { name: 'Format Converter', href: '/converter', icon: FileAudio },
  { name: 'Audio Editor', href: '/editor', icon: Scissors },
  { name: 'Noise Reduction', href: '/noise-reduction', icon: RotateCcw },
  { name: 'API Docs', href: '/docs', icon: Code },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-main">
      <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-disney rounded-2xl flex items-center justify-center shadow-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white">AudioStudio</span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href === '/docs' ? '/docs' : item.href}
                    target={item.href === '/docs' ? '_blank' : undefined}
                    className={`nav-item flex items-center space-x-2 ${
                      isActive ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="custom-scrollbar"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}