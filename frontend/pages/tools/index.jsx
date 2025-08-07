import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Search,
  Star,
  Zap
} from 'lucide-react'
import { 
  OdoremoverLogo,
  VocalRemoverIcon,
  PitchTempoIcon,
  ConverterIcon,
  AudioSplitterIcon,
  KaraokeIcon,
  NoiseReductionIcon,
  VolumeNormalizerIcon,
  EqualizerIcon,
  RecorderIcon,
  CutterJoinerIcon,
  MetadataEditorIcon,
  AudioReverseIcon,
  FadeEffectIcon
} from '../../components/CustomIcons'

export default function AllTools() {
  const [searchTerm, setSearchTerm] = useState('')

  const tools = [
    {
      title: "Vocal Remover",
      subtitle: "AI-Powered Vocal Isolation", 
      description: "Remove vocals from any song with advanced AI technology. Perfect for karaoke and instrumental versions.",
      href: "/tools/vocal-remover",
      icon: VocalRemoverIcon,
      gradient: "from-blue-500 to-purple-600",
      category: "Vocal",
      popular: true
    },
    {
      title: "Pitch & Tempo", 
      subtitle: "Independent Pitch & Speed Control",
      description: "Change pitch and tempo independently without affecting audio quality. Professional music production tool.",
      href: "/tools/pitch-tempo",
      icon: PitchTempoIcon,
      gradient: "from-purple-500 to-indigo-600",
      category: "Effects"
    },
    {
      title: "Audio Converter",
      subtitle: "Universal Format Support",
      description: "Convert between all major audio formats with high quality preservation. MP3, WAV, FLAC, AAC and more.",
      href: "/tools/converter",
      icon: ConverterIcon,
      gradient: "from-cyan-500 to-blue-600",
      category: "Convert"
    },
    {
      title: "Audio Splitter",
      subtitle: "Stereo Channel Separation",
      description: "Split stereo audio into separate left and right channel tracks with perfect quality preservation.",
      href: "/tools/audio-splitter",
      icon: AudioSplitterIcon,
      gradient: "from-green-500 to-emerald-600",
      category: "Edit"
    },
    {
      title: "Karaoke Maker",
      subtitle: "Instant Karaoke Creation",
      description: "Transform any song into professional karaoke tracks. Get both instrumental and vocal versions.",
      href: "/tools/karaoke",
      icon: KaraokeIcon,
      gradient: "from-pink-500 to-rose-600",
      category: "Vocal",
      popular: true
    },
    {
      title: "Noise Reducer",
      subtitle: "Advanced Audio Cleaning",
      description: "Remove background noise and unwanted sounds using spectral subtraction algorithms.",
      href: "/tools/noise-reduction",
      icon: NoiseReductionIcon,
      gradient: "from-emerald-500 to-teal-600",
      category: "Enhance"
    },
    {
      title: "Volume Normalizer",
      subtitle: "Professional Audio Leveling",
      description: "Normalize audio volume levels for consistent playback across all devices and platforms.",
      href: "/tools/volume-normalizer",
      icon: VolumeNormalizerIcon,
      gradient: "from-orange-500 to-red-600",
      category: "Enhance"
    },
    {
      title: "Audio Equalizer",
      subtitle: "Frequency Response Control",
      description: "Fine-tune audio frequencies with professional 5-band equalizer. Perfect for mixing and mastering.",
      href: "/tools/equalizer",
      icon: EqualizerIcon,
      gradient: "from-teal-500 to-cyan-600",
      category: "Effects"
    },
    {
      title: "Audio Recorder",
      subtitle: "High-Quality Recording",
      description: "Record professional quality audio directly from your microphone with advanced noise suppression.",
      href: "/tools/recorder",
      icon: RecorderIcon,
      gradient: "from-red-500 to-pink-600",
      category: "Record"
    },
    {
      title: "Cutter & Joiner",
      subtitle: "Precision Audio Editing",
      description: "Cut audio at precise timestamps or join multiple files seamlessly with professional results.",
      href: "/tools/cutter-joiner",
      icon: CutterJoinerIcon,
      gradient: "from-yellow-500 to-orange-600",
      category: "Edit"
    },
    {
      title: "Metadata Editor",
      subtitle: "Audio Tag Management",
      description: "Edit MP3 tags and metadata including title, artist, album, year, and artwork information.",
      href: "/tools/metadata-editor",
      icon: MetadataEditorIcon,
      gradient: "from-emerald-500 to-green-600",
      category: "Edit"
    },
    {
      title: "Audio Reverse",
      subtitle: "Creative Audio Effects",
      description: "Reverse audio playback completely for special effects, creative projects, and sound design.",
      href: "/tools/audio-reverse",
      icon: AudioReverseIcon,
      gradient: "from-violet-500 to-purple-600",
      category: "Effects"
    },
    {
      title: "Fade Effect",
      subtitle: "Smooth Audio Transitions",
      description: "Add professional fade in/out effects with custom duration controls for smooth audio transitions.",
      href: "/tools/fade-effect",
      icon: FadeEffectIcon,
      gradient: "from-amber-500 to-yellow-600",
      category: "Effects"
    }
  ]

  const categories = ["All", "Vocal", "Effects", "Convert", "Enhance", "Edit", "Record"]
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

      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Header */}
        <header className="relative z-10 border-b border-gray-800 bg-gray-800/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <OdoremoverLogo className="w-10 h-10 text-white" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">ODOREMOVER</h1>
              </Link>

              {/* Right Side */}
              <Link 
                href="/"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Title */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <OdoremoverLogo className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Professional Audio Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Complete collection of AI-powered audio processing tools for creators, musicians, and producers. 
              Transform your audio with cutting-edge technology.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">13 Tools Available</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Processing</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-16">
            {/* Search Bar */}
            <div className="relative max-w-3xl mx-auto mb-12">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for audio tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-xl text-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 backdrop-blur-xl ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                      {filteredTools.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map((tool, index) => (
              <Link key={tool.title} href={tool.href}>
                <div
                  className="group relative overflow-hidden rounded-3xl bg-gray-800/50 border border-gray-700 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-xl hover:bg-gray-800/70"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Popular Badge */}
                  {tool.popular && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-3 py-1 rounded-full font-bold flex items-center shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  <div className={`absolute -inset-1 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Tool Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <tool.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-xs px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-semibold">
                        FREE
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-400 mb-4">
                      {tool.subtitle}
                    </p>
                  </div>

                  {/* Tool Info */}
                  <div className="relative z-10">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-lg font-medium border border-gray-600/50">
                        {tool.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>

                    {/* Action Section */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-medium">
                        Ready to use
                      </div>
                      <div className="flex items-center text-blue-400 group-hover:text-white transition-colors text-sm font-semibold">
                        Try Now
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-gray-700">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No tools found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Try adjusting your search terms or browse a different category to find the perfect audio tool.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Show All Tools
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}