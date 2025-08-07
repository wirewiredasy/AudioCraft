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
  Volume2,
  Scissors,
  Edit3,
  Wand2,
  RotateCcw
} from 'lucide-react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const tools = [
    {
      title: "Vocal Remover",
      subtitle: "Perfect instrument Extractor",
      rating: "7",
      type: "FREE",
      description: "Precise vocal and chorus separation. Separate voiced and vocal split chorus",
      href: "/tools/vocal-remover",
      icon: Play,
      gradient: "from-red-500 to-pink-600"
    },
    {
      title: "Pitch Changer", 
      subtitle: "Precise Enhance Transpose",
      rating: "7",
      type: "FREE", 
      description: "Enhance, boost or change transient, sharpen landscape background sound, enhance and decrease sound",
      href: "/tools/pitch-tempo",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Audio Converter",
      subtitle: "Enhance & Reduce",
      rating: "7",
      type: "FREE",
      description: "Resample favorite change sharpen sharpest responsive/real-time Shaper contrast with voice all format enhancement stereo",
      href: "/tools/converter",
      icon: RefreshCw,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Equalizer",
      subtitle: "Feeling/Channel/Pro Sharper",
      rating: "7", 
      type: "FREE",
      description: "boost/sub-bass, in-music cut/find Filtering, Enhancer by Alyse, Event enhancement and, balance and to music split",
      href: "/tools/equalizer",
      icon: BarChart3,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Noise Reducer",
      subtitle: "Clean Audio Enhancement",
      rating: "7",
      type: "FREE",
      description: "Remove background noise and improve audio quality using advanced algorithms",
      href: "/tools/noise-reducer",
      icon: ShieldCheck,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      title: "Volume Normalizer",
      subtitle: "Audio Level Control",
      rating: "7",
      type: "FREE",
      description: "Enhance audio volume with professional normalization and gain control",
      href: "/tools/volume-normalizer",
      icon: Volume2,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Audio Editor",
      subtitle: "Cut & Join Tool",
      rating: "7",
      type: "FREE",
      description: "Cut, trim, and join audio files with precision timing controls",
      href: "/tools/cutter-joiner",
      icon: Scissors,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Metadata Editor",
      subtitle: "Tag Information",
      rating: "7",
      type: "FREE",
      description: "Edit MP3 tags including title, artist, album, and year information",
      href: "/tools/metadata-editor",
      icon: Edit3,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Fade Effects",
      subtitle: "Smooth Transitions",
      rating: "7",
      type: "FREE",
      description: "Add professional fade in/out effects to create smooth audio transitions",
      href: "/tools/fade-effect",
      icon: Wand2,
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      title: "Audio Reverser",
      subtitle: "Reverse Playback",
      rating: "7",
      type: "FREE",
      description: "Reverse audio playback completely for special effects and creative projects",
      href: "/tools/audio-reverse",
      icon: RotateCcw,
      gradient: "from-orange-500 to-red-600"
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
                {['Home', 'Tools', 'About', 'Contact'].map((item, index) => (
                  <Link 
                    key={`${item}-${index}`}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors font-medium`}
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
                <button className={`px-6 py-2 rounded-full ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'} transition-colors font-medium`}>
                  Sign up
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
                    key={`wave-${i}`}
                    className={`bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm animate-pulse`}
                    style={{
                      width: '2px',
                      height: `${30 + (i % 5) * 10}%`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '3s'
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
              <Link href="/tools" className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Start now
              </Link>
              <Link href="/tools" className={`px-8 py-4 ${isDarkMode ? 'bg-slate-800 text-white border border-slate-600' : 'bg-transparent text-slate-900 border border-gray-300'} rounded-full font-semibold hover:bg-opacity-80 transition-all transform hover:scale-105`}>
                View all tools
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-6`}>
                Professional Audio Tools
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block mt-2">
                  All Free to Use
                </span>
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Transform your audio with our complete collection of professional-grade tools. 
                Remove vocals, adjust pitch, convert formats, and enhance your audio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <div
                  key={tool.title}
                  className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700/50' : 'bg-white/80 border-gray-200/50'} backdrop-blur-sm border rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Tool Header */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl shadow-lg`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1 font-medium`}>
                        ⭐ {tool.rating}
                      </div>
                      <div className={`text-xs px-3 py-1 ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'} rounded-full font-semibold`}>
                        {tool.type}
                      </div>
                    </div>
                  </div>

                  {/* Tool Info */}
                  <div className="relative z-10">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${tool.gradient} group-hover:bg-clip-text transition-all duration-300`}>
                      {tool.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4 font-medium`}>
                      {tool.subtitle}
                    </p>

                    {/* Free Badge */}
                    <div className="mb-4">
                      <div className={`inline-block px-4 py-2 ${isDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-600 border border-green-200'} rounded-full text-sm font-bold`}>
                        100% FREE
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 line-clamp-3 leading-relaxed`}>
                      {tool.description}
                    </p>

                    {/* Action Button */}
                    <Link
                      href={tool.href}
                      className={`block w-full py-4 px-6 bg-gradient-to-r ${tool.gradient} text-white rounded-2xl text-center font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                      Start now
                    </Link>
                  </div>
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