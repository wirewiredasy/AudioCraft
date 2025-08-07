import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Mic, 
  Music, 
  RefreshCw, 
  Sliders,
  ShieldCheck,
  Settings,
  HelpCircle,
  Play,
  TrendingUp,
  BarChart3,
  Volume2,
  Scissors,
  Edit3,
  Wand2,
  RotateCcw,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export default function Home() {

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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* Header */}
        <header className="backdrop-blur-xl bg-slate-900/80 border-b border-purple-500/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Odoremover
                </h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Settings', href: '/settings', icon: Settings },
                  { name: 'Help', href: '/help', icon: HelpCircle }
                ].map((item, index) => (
                  <Link 
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium hover:scale-105 transition-transform shadow-lg">
                  Scomiecer
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
            
            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Waveform Animation */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
              <div className="flex items-end justify-center h-full space-x-1 px-4">
                {Array.from({ length: 150 }).map((_, i) => (
                  <div
                    key={`wave-${i}`}
                    className="bg-gradient-to-t from-orange-500/60 via-purple-500/40 to-transparent rounded-sm"
                    style={{
                      width: '2px',
                      height: `${20 + Math.sin(i * 0.1) * 40 + Math.random() * 20}%`,
                      animation: `wave 2s ease-in-out infinite ${i * 0.02}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-full text-orange-400 text-sm font-medium border border-orange-500/20">
                Professional Audio Processing
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Remove Vocals,
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Enhance Sound
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your audio with cutting-edge AI technology. Professional tools for 
              creators, musicians, and producers worldwide.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/tools" 
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-orange-500/25"
              >
                <span className="flex items-center space-x-2">
                  <span>Start now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </Link>
              
              <Link 
                href="/tools" 
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white border border-purple-500/30 rounded-full font-semibold hover:bg-slate-700/50 transition-all transform hover:scale-105"
              >
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional Audio Tools
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent block mt-2">
                  All Free to Use
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your audio with our complete collection of professional-grade tools. 
                Remove vocals, adjust pitch, convert formats, and enhance your audio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tools.map((tool, index) => (
                <div
                  key={tool.title}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-purple-500/20 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  <div className={`absolute -inset-1 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Tool Header */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-orange-400 mb-1 font-medium">
                        ⭐ {tool.rating}
                      </div>
                      <div className="text-xs px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-semibold">
                        {tool.type}
                      </div>
                    </div>
                  </div>

                  {/* Tool Info */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 font-medium">
                      {tool.subtitle}
                    </p>

                    {/* Free Badge */}
                    <div className="mb-4">
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-bold">
                        100% FREE
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Action Button */}
                    <Link
                      href={tool.href}
                      className={`block w-full py-4 px-6 bg-gradient-to-r ${tool.gradient} text-white rounded-2xl text-center font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden`}
                    >
                      <span className="relative z-10">Start now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-purple-500/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-xl border border-orange-500/20">
                  <Volume2 className="w-5 h-5 text-orange-400" />
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-600/20 rounded-xl border border-purple-500/20">
                  <Mic className="w-5 h-5 text-purple-400" />
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-xl border border-blue-500/20">
                  <Music className="w-5 h-5 text-blue-400" />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl text-sm font-medium transition-all hover:scale-105 border border-slate-600">
                  Contact
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-400">
                Download Odoremover Application to Try Audio → Mixtape of Programs from More.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}