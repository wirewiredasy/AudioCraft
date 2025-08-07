import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Mic, 
  Music, 
  RefreshCw, 
  Sliders,
  ShieldCheck,
  Moon,
  Sun,
  Play,
  TrendingUp,
  BarChart3,
  Volume2
} from 'lucide-react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const tools = [
    {
      title: "Vocal Remover",
      subtitle: "Perfect instrument Extractor",
      price: "$89.50",
      originalPrice: "$120.00",
      rating: "7",
      type: "FREEMIUM",
      description: "Precise vocal and chorus separation. Separate voiced and vocal split chorus",
      href: "/tools/vocal-remover",
      icon: Play
    },
    {
      title: "Pitch Changer", 
      subtitle: "Precise Enhance Transpose",
      price: "$26.10",
      originalPrice: "$35.00",
      rating: "7",
      type: "FREEMIUM", 
      description: "Enhance, boost or change transient, sharpen landscape background sound, enhance and decrease sound",
      href: "/tools/pitch-tempo",
      icon: TrendingUp
    },
    {
      title: "Audio Converter",
      subtitle: "Enhance & Reduce",
      price: "$32.12",
      originalPrice: "$45.00", 
      rating: "7",
      type: "FREEMIUM",
      description: "Resample favorite change sharpen sharpest responsive/real-time Shaper contrast with voice all format enhancement stereo",
      href: "/tools/converter",
      icon: RefreshCw
    },
    {
      title: "Equalizer",
      subtitle: "Feeling/Channel/Pro Sharper",
      price: "$49.30",
      originalPrice: "$65.00",
      rating: "7", 
      type: "FREEMIUM",
      description: "boost/sub-bass, in-music cut/find Filtering, Enhancer by Alyse, Event enhancement and, balance and to music split",
      href: "/tools/equalizer",
      icon: BarChart3
    }
  ]

  return (
    <>
      <Head>
        <title>Odoremover - Professional Audio Processing Tools</title>
        <meta name="description" content="Remove vocals, enhance sound with professional audio processing tools" />
      </Head>

      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-slate-800/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center">
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Odoremover
                </h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {['Home', 'Tools', 'Tools', 'About', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} transition-all hover:scale-110`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className={`px-6 py-2 rounded-full ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'} transition-colors`}>
                  Vocal Mixing
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Audio Waveform Background */}
          <div className="absolute inset-0">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'}`} />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20">
              {/* Waveform Animation */}
              <div className="flex items-end justify-center h-full space-x-1 px-4">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm animate-pulse`}
                    style={{
                      width: '2px',
                      height: `${Math.random() * 80 + 20}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className={`text-5xl md:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6 leading-tight`}>
              Remove Vocalss,
              <br />
              Enhance Sound
            </h1>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-12 max-w-2xl mx-auto`}>
              Unlock the full potential of your audio.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools" className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </Link>
              <Link href="/pricing" className={`px-8 py-4 ${isDarkMode ? 'bg-slate-800 text-white border border-slate-600' : 'bg-transparent text-slate-900 border border-gray-300'} rounded-full font-semibold hover:bg-opacity-80 transition-colors`}>
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div
                  key={tool.title}
                  className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Tool Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-xl`}>
                      <tool.icon className={`w-6 h-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                        {tool.rating}
                      </div>
                      <div className={`text-xs px-2 py-1 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}>
                        {tool.type}
                      </div>
                    </div>
                  </div>

                  {/* Tool Info */}
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
                    {tool.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                    {tool.subtitle}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {tool.price}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                        {tool.originalPrice}
                      </span>
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      FREEMIUM
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 line-clamp-3`}>
                    {tool.description}
                  </p>

                  {/* Action Button */}
                  <Link
                    href={tool.href}
                    className={`block w-full py-3 px-6 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-slate-900'} rounded-xl text-center font-medium transition-colors`}
                  >
                    Open Tool
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'} border-t py-12`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className={`p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-white'} rounded-lg`}>
                  <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div className={`p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-white'} rounded-lg`}>
                  <Mic className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div className={`p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-white'} rounded-lg`}>
                  <Music className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <button className={`px-4 py-2 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'} rounded-lg text-sm font-medium transition-colors hover:opacity-80`}>
                  Contact
                </button>
              </div>
              
              <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Download Odoremover Application to Try Audio → Mixtape of Programs from More.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}