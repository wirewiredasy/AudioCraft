import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Music, Home, Wrench } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Tools', href: '/tools', icon: Wrench },
  ]

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300 transition-colors">
              ODOREMOVER
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/tools"
              className="btn-primary"
            >
              Start Processing
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-button p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-up">
            <div className="glass-card space-y-4">
              {navigation.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 p-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-white/20">
                <Link
                  href="/tools"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Processing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}