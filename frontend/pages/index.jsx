import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Mic, 
  Music, 
  RefreshCw, 
  Sliders,
  ShieldCheck,
  TrendingUp,
  Volume2,
  Scissors,
  Edit3,
  Wand2,
  RotateCcw,
  BarChart3,
  Play,
  Menu,
  X,
  Upload,
  User,
  Globe,
  Settings,
  Headphones,
  Zap
} from 'lucide-react'

export default function VocalRemoverClone() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Sidebar navigation items matching vocalremover.org
  const sidebarItems = [
    { 
      icon: Mic, 
      label: 'Remover', 
      href: '/tools/vocal-remover',
      isActive: true 
    },
    { 
      icon: Music, 
      label: 'Splitter', 
      href: '/tools/audio-splitter' 
    },
    { 
      icon: TrendingUp, 
      label: 'Pitcher', 
      href: '/tools/pitch-tempo' 
    },
    { 
      icon: Scissors, 
      label: 'Cutter', 
      href: '/tools/cutter-joiner' 
    },
    { 
      icon: Volume2, 
      label: 'Joiner', 
      href: '/tools/cutter-joiner' 
    },
    { 
      icon: Headphones, 
      label: 'Recorder', 
      href: '/tools/recorder' 
    },
    { 
      icon: BarChart3, 
      label: 'Karaoke', 
      href: '/tools/karaoke' 
    },
    { 
      icon: Settings, 
      label: 'Support', 
      href: '/support' 
    }
  ]

  return (
    <>
      <Head>
        <title>AI Vocal Remover and Isolation [No Limits] - Free Online Tool</title>
        <meta name="description" content="Remove vocals from any song for free using advanced AI. Create karaoke tracks and acapella versions instantly. No registration required, unlimited usage." />
        <meta name="keywords" content="vocal remover, karaoke maker, acapella creator, AI audio separation, remove vocals online, free vocal isolation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="AI Vocal Remover and Isolation - Free Online Tool" />
        <meta property="og:description" content="Remove vocals from any song for free using advanced AI. Create karaoke tracks and acapella versions instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vocalremover.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Vocal Remover - Free Online Tool" />
        <meta name="twitter:description" content="Remove vocals from any song for free using advanced AI algorithms." />
        <link rel="canonical" href="https://vocalremover.org" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-16 bg-gray-800 border-r border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            {isSidebarOpen ? (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            ) : (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-8 space-y-2 px-2">
            {sidebarItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors group ${
                  item.isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Items */}
          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
            <div className="flex items-center px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
              <User className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && (
                <span className="ml-3 text-sm font-medium">Account</span>
              )}
            </div>
            <div className="flex items-center px-3 py-2 text-xs text-gray-500">
              <Globe className="w-4 h-4 flex-shrink-0" />
              {isSidebarOpen && (
                <span className="ml-2">EN</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {/* Main Header - HOW IT WORKS */}
          <div className="text-center py-16 px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-4">
                HOW IT WORKS
              </p>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Vocal Remover and Isolation
              </h1>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Separate voice from music out of a song free with powerful AI algorithms
              </p>

              {/* Audio Visualization */}
              <div className="mb-12 max-w-md mx-auto">
                <div className="space-y-4">
                  {/* Music Track */}
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm font-medium w-12 text-right">Music</span>
                    <div className="flex-1 h-8 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-300 opacity-80"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-white bg-opacity-30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vocal Track */}
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm font-medium w-12 text-right">Vocal</span>
                    <div className="flex-1 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 opacity-80"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-white bg-opacity-30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Button */}
              <div className="mb-16">
                <Link 
                  href="/tools/vocal-remover"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Browse my files
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
                  <p className="text-gray-400 text-sm">AI-powered vocal separation in seconds</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
                  <p className="text-gray-400 text-sm">Your files are processed securely and deleted automatically</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">High Quality</h3>
                  <p className="text-gray-400 text-sm">Professional results with advanced algorithms</p>
                </div>
              </div>

              {/* Additional Tools Section */}
              <div className="mt-20 pt-16 border-t border-gray-800">
                <h2 className="text-2xl font-bold mb-8">Other Audio Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <Link href="/tools/pitch-tempo" className="group">
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <TrendingUp className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                      <h3 className="text-sm font-semibold text-center">Pitch Changer</h3>
                    </div>
                  </Link>
                  
                  <Link href="/tools/converter" className="group">
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <RefreshCw className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                      <h3 className="text-sm font-semibold text-center">Audio Converter</h3>
                    </div>
                  </Link>
                  
                  <Link href="/tools/cutter-joiner" className="group">
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <Scissors className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                      <h3 className="text-sm font-semibold text-center">Audio Cutter</h3>
                    </div>
                  </Link>
                  
                  <Link href="/tools/volume-normalizer" className="group">
                    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <Volume2 className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                      <h3 className="text-sm font-semibold text-center">Volume Booster</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}