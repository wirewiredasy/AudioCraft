import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Menu,
  X,
  Upload,
  User,
  Globe,
  Settings,
  Zap,
  ShieldCheck,
  Music,
  TrendingUp,
  RefreshCw,
  Scissors,
  Volume2
} from 'lucide-react'
import {
  OdoremoverLogo,
  VocalRemoverIcon,
  AudioSplitterIcon,
  PitchTempoIcon,
  ConverterIcon,
  RecorderIcon,
  KaraokeIcon,
  CutterJoinerIcon,
  VolumeNormalizerIcon,
  SupportIcon,
  AccountIcon,
  LanguageIcon
} from '../components/CustomIcons'
import Footer from '../components/Footer' // Import the Footer component

export default function OdoremoverHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sidebar navigation items with custom icons
  const sidebarItems = [
    { 
      icon: VocalRemoverIcon, 
      label: 'Remover', 
      href: '/tools/vocal-remover',
      isActive: true 
    },
    { 
      icon: AudioSplitterIcon, 
      label: 'Splitter', 
      href: '/tools/audio-splitter' 
    },
    { 
      icon: PitchTempoIcon, 
      label: 'Pitcher', 
      href: '/tools/pitch-tempo' 
    },
    { 
      icon: CutterJoinerIcon, 
      label: 'Cutter', 
      href: '/tools/cutter-joiner' 
    },
    { 
      icon: VolumeNormalizerIcon, 
      label: 'Volume', 
      href: '/tools/volume-normalizer' 
    },
    { 
      icon: RecorderIcon, 
      label: 'Recorder', 
      href: '/tools/recorder' 
    },
    { 
      icon: KaraokeIcon, 
      label: 'Karaoke', 
      href: '/tools/karaoke' 
    },
    { 
      icon: SupportIcon, 
      label: 'Support', 
      href: '/support' 
    }
  ]

  return (
    <>
      <Head>
        <title>ODOREMOVER - AI Audio Processing Suite [Professional Tools]</title>
        <meta name="description" content="Professional audio processing with ODOREMOVER suite. Vocal removal, pitch adjustment, format conversion, noise reduction, and more. Advanced AI-powered tools for musicians and creators." />
        <meta name="keywords" content="odoremover, audio processing, vocal remover, pitch tempo, audio converter, karaoke maker, AI audio tools, professional audio editing" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="ODOREMOVER - Professional AI Audio Processing Suite" />
        <meta property="og:description" content="Advanced audio processing tools with AI technology. Vocal removal, pitch adjustment, format conversion, and professional editing features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://odoremover.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ODOREMOVER - AI Audio Processing Suite" />
        <meta name="twitter:description" content="Professional audio tools powered by advanced AI algorithms." />
        <link rel="canonical" href="https://odoremover.app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Mobile Header */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <OdoremoverLogo className="w-8 h-8 text-white" />
              <span className="text-lg font-bold">ODOREMOVER</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 ${isMobile ? 'w-full' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          isMobile 
            ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full')
            : (isSidebarOpen ? 'w-64' : 'w-16')
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
            {(isSidebarOpen || isMobile) ? (
              <>
                <div className="flex items-center space-x-3">
                  <OdoremoverLogo className="w-8 h-8 text-white" />
                  <span className="text-lg font-bold">ODOREMOVER</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors mx-auto"
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
            <Link href="/auth/login" className="flex items-center px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              <AccountIcon className="w-5 h-5 flex-shrink-0" />
              {(isSidebarOpen || isMobile) && (
                <span className="ml-3 text-sm font-medium">Sign In</span>
              )}
            </Link>
            <div className="flex items-center px-3 py-2 text-xs text-gray-500">
              <LanguageIcon className="w-4 h-4 flex-shrink-0" />
              {(isSidebarOpen || isMobile) && (
                <span className="ml-2">English</span>
              )}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isMobile 
            ? 'ml-0 pt-16' 
            : (isSidebarOpen ? 'ml-64' : 'ml-16')
        }`}>
          {/* Main Header - HOW IT WORKS */}
          <div className="text-center py-16 px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-4">
                HOW IT WORKS
              </p>

              <div className="flex items-center justify-center mb-6">
                <OdoremoverLogo className="w-16 h-16 mr-4 text-blue-400" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    ODOREMOVER
                  </h1>
                  <p className="text-lg text-blue-400 font-medium">Audio Processing Suite</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-200">
                Vocal Remover and Isolation
              </h2>

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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <Link href="/tools/pitch-tempo" className="group">
                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition-colors">
                      <PitchTempoIcon className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                      <h3 className="text-xs md:text-sm font-semibold text-center">Pitch Tempo</h3>
                    </div>
                  </Link>

                  <Link href="/tools/converter" className="group">
                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition-colors">
                      <ConverterIcon className="w-8 h-8 text-cyan-400 mb-3 mx-auto" />
                      <h3 className="text-xs md:text-sm font-semibold text-center">Converter</h3>
                    </div>
                  </Link>

                  <Link href="/tools/audio-splitter" className="group">
                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition-colors">
                      <AudioSplitterIcon className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                      <h3 className="text-xs md:text-sm font-semibold text-center">Splitter</h3>
                    </div>
                  </Link>

                  <Link href="/tools/karaoke" className="group">
                    <div className="bg-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-700 transition-colors">
                      <KaraokeIcon className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
                      <h3 className="text-xs md:text-sm font-semibold text-center">Karaoke</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  )
}