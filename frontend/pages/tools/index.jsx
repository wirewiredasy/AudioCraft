import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  ArrowLeft, 
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
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Search
} from 'lucide-react'

export default function AllTools() {
  const [searchTerm, setSearchTerm] = useState('')

  const tools = [
    {
      title: "Vocal Remover",
      subtitle: "Perfect instrument Extractor", 
      description: "Precise vocal and chorus separation. Separate voiced and vocal split chorus",
      href: "/tools/vocal-remover",
      icon: Play,
      gradient: "from-red-500 to-pink-600",
      category: "Vocal"
    },
    {
      title: "Pitch Changer", 
      subtitle: "Precise Enhance Transpose",
      description: "Enhance, boost or change transient, sharpen landscape background sound",
      href: "/tools/pitch-tempo",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-600",
      category: "Effects"
    },
    {
      title: "Audio Converter",
      subtitle: "Enhance & Reduce",
      description: "Convert audio files between different formats with professional quality",
      href: "/tools/converter",
      icon: RefreshCw,
      gradient: "from-green-500 to-emerald-600",
      category: "Convert"
    },
    {
      title: "Equalizer",
      subtitle: "Feeling/Channel/Pro Sharper",
      description: "boost/sub-bass, in-music cut/find Filtering, Enhancer by Alyse",
      href: "/tools/equalizer",
      icon: BarChart3,
      gradient: "from-purple-500 to-indigo-600",
      category: "Effects"
    },
    {
      title: "Noise Reducer",
      subtitle: "Clean Audio Enhancement",
      description: "Remove background noise and improve audio quality using advanced algorithms",
      href: "/tools/noise-reducer",
      icon: ShieldCheck,
      gradient: "from-yellow-500 to-orange-600",
      category: "Enhance"
    },
    {
      title: "Volume Normalizer",
      subtitle: "Audio Level Control",
      description: "Enhance audio volume with professional normalization and gain control",
      href: "/tools/volume-normalizer",
      icon: Volume2,
      gradient: "from-pink-500 to-rose-600",
      category: "Enhance"
    },
    {
      title: "Audio Editor",
      subtitle: "Cut & Join Tool",
      description: "Cut, trim, and join audio files with precision timing controls",
      href: "/tools/cutter-joiner",
      icon: Scissors,
      gradient: "from-violet-500 to-purple-600",
      category: "Edit"
    },
    {
      title: "Metadata Editor",
      subtitle: "Tag Information",
      description: "Edit MP3 tags including title, artist, album, and year information",
      href: "/tools/metadata-editor",
      icon: Edit3,
      gradient: "from-indigo-500 to-blue-600",
      category: "Edit"
    },
    {
      title: "Fade Effects",
      subtitle: "Smooth Transitions",
      description: "Add professional fade in/out effects to create smooth audio transitions",
      href: "/tools/fade-effect",
      icon: Wand2,
      gradient: "from-teal-500 to-cyan-600",
      category: "Effects"
    },
    {
      title: "Audio Reverser",
      subtitle: "Reverse Playback",
      description: "Reverse audio playback completely for special effects and creative projects",
      href: "/tools/audio-reverse",
      icon: RotateCcw,
      gradient: "from-orange-500 to-red-600",
      category: "Effects"
    }
  ]

  const categories = ["All", "Vocal", "Effects", "Convert", "Enhance", "Edit"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Head>
        <title>All Audio Tools - Odoremover</title>
        <meta name="description" content="Complete collection of professional audio processing tools" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* Header */}
        <header className="backdrop-blur-xl bg-slate-900/80 border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Odoremover</h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Home
                </Link>
                <Link href="/settings" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </Link>
              </nav>

              {/* Right Side */}
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium hover:scale-105 transition-transform shadow-lg">
                Scomiecer
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              All Audio Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete collection of professional audio processing tools for creators, musicians, and producers.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-gray-300 hover:text-white border border-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map((tool, index) => (
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
                    <div className="text-xs px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-semibold">
                      FREE
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

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs bg-slate-700/50 text-slate-300 rounded-full">
                      {tool.category}
                    </span>
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
                    <span className="relative z-10">Use Tool</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No tools found</h3>
              <p className="text-gray-400 mb-8">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-medium hover:scale-105 transition-transform"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </>
  )
}