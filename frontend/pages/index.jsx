import React from 'react'
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
  Play
} from 'lucide-react'

export default function Dashboard() {
  // All available backend tools mapped to proper frontend tools
  const tools = [
    {
      title: "Vocal Remover and Isolation",
      subtitle: "AI-Powered Vocal Separation",
      description: "Separate voice from music out of a song free with powerful AI algorithms. Get karaoke and acapella versions instantly.",
      icon: Mic,
      gradient: "from-blue-500 to-purple-600",
      href: "/tools/vocal-remover",
      category: "AI Processing"
    },
    {
      title: "Pitch & Tempo Editor",
      subtitle: "Independent Audio Control",
      description: "Adjust pitch and tempo independently without affecting audio quality. Professional speed and key changes.",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      href: "/tools/pitch-tempo",
      category: "Audio Editing"
    },
    {
      title: "Audio Format Converter",
      subtitle: "Universal File Support",
      description: "Convert between MP3, WAV, FLAC, AAC, OGG and more. Multiple quality options for every need.",
      icon: RefreshCw,
      gradient: "from-teal-500 to-cyan-500",
      href: "/tools/converter",
      category: "Conversion"
    },
    {
      title: "Audio Cutter & Joiner",
      subtitle: "Precise Audio Editing",
      description: "Cut audio files at exact timestamps or join multiple files seamlessly. Professional editing tools.",
      icon: Scissors,
      gradient: "from-orange-500 to-red-500",
      href: "/tools/cutter-joiner",
      category: "Editing Tools"
    },
    {
      title: "Noise Reduction",
      subtitle: "Advanced Audio Cleanup",
      description: "Remove background noise using advanced algorithms. Clean up recordings and enhance audio quality.",
      icon: ShieldCheck,
      gradient: "from-green-500 to-emerald-500",
      href: "/tools/noise-reduction",
      category: "Enhancement"
    },
    {
      title: "Volume Normalizer",
      subtitle: "Audio Level Control",
      description: "Normalize and boost audio volume to professional standards. Consistent audio levels across files.",
      icon: Volume2,
      gradient: "from-indigo-500 to-blue-500",
      href: "/tools/volume-normalizer",
      category: "Enhancement"
    },
    {
      title: "Fade Effects",
      subtitle: "Professional Transitions",
      description: "Add smooth fade in and fade out effects to your audio. Professional transition effects.",
      icon: Wand2,
      gradient: "from-pink-500 to-purple-500",
      href: "/tools/fade-effect",
      category: "Effects"
    },
    {
      title: "Metadata Editor",
      subtitle: "MP3 Tag Management",
      description: "Edit audio metadata, MP3 tags, title, artist, album information. Organize your music library.",
      icon: Edit3,
      gradient: "from-gray-600 to-slate-600",
      href: "/tools/metadata-editor",
      category: "Organization"
    },
    {
      title: "Audio Reverse",
      subtitle: "Backwards Playback",
      description: "Reverse audio playback completely. Create unique backwards effects and special audio experiences.",
      icon: RotateCcw,
      gradient: "from-violet-500 to-purple-500",
      href: "/tools/audio-reverse",
      category: "Effects"
    },
    {
      title: "Audio Equalizer",
      subtitle: "Frequency Control",
      description: "Professional 3-band equalizer with low, mid, and high frequency adjustment. Fine-tune your audio.",
      icon: BarChart3,
      gradient: "from-cyan-500 to-teal-500",
      href: "/tools/equalizer",
      category: "Enhancement"
    }
  ]

  return (
    <>
      <Head>
        <title>ODOREMOVER Audio Suite - Professional Audio Processing Tools</title>
        <meta name="description" content="Separate voice from music, edit audio, convert formats and more with powerful AI algorithms. Free online audio processing tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ODOREMOVER</h1>
                  <p className="text-sm text-gray-600">Professional Audio Suite</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  How it works
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Audio Processing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Suite</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Separate voice from music, edit audio files, convert formats and enhance sound quality with powerful AI algorithms. 
            Complete professional audio tools, absolutely free.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10+</div>
              <div className="text-gray-600">Audio Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">AI-Powered</div>
              <div className="text-gray-600">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">Free</div>
              <div className="text-gray-600">Forever</div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Audio Processing Tools</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Choose from our comprehensive suite of professional audio tools. Each tool is powered by advanced algorithms 
              for the highest quality results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              return (
                <Link 
                  key={tool.title}
                  href={tool.href}
                  className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                >
                  {/* Tool Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tool.title}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-lg">
                          {tool.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-blue-600 mb-2">{tool.subtitle}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-500">Try Now →</span>
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Play className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">ODOREMOVER Audio Suite</span>
              </div>
              <p className="text-gray-600 mb-6">Professional audio processing tools powered by advanced AI algorithms</p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                <a href="#" className="hover:text-gray-700">Terms of Service</a>
                <a href="#" className="hover:text-gray-700">API Documentation</a>
                <a href="#" className="hover:text-gray-700">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}