import Head from 'next/head'
import Header from '../../components/Header'
import ToolCard from '../../components/ToolCard'
import { 
  Mic, 
  Music, 
  RefreshCw, 
  Scissors, 
  ShieldCheck, 
  Volume2,
  Wand2,
  Edit3,
  RotateCcw,
  Sliders
} from 'lucide-react'

export default function Tools() {
  const tools = [
    {
      title: "Vocal Remover",
      description: "Remove vocals from songs to create instrumental tracks or karaoke versions using AI-powered separation.",
      href: "/tools/vocal-remover",
      icon: Mic,
      gradient: "from-red-500 to-pink-600"
    },
    {
      title: "Pitch & Tempo",
      description: "Adjust pitch and tempo independently for creative effects and music production.",
      href: "/tools/pitch-tempo",
      icon: Music,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Format Converter",
      description: "Convert audio files between different formats (MP3, WAV, FLAC, etc.) with quality options.",
      href: "/tools/converter",
      icon: RefreshCw,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Audio Editor",
      description: "Cut, trim, and join audio files with precision timing controls.",
      href: "/tools/cutter-joiner",
      icon: Scissors,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Noise Reducer",
      description: "Remove background noise and improve audio quality using advanced algorithms.",
      href: "/tools/noise-reducer",
      icon: ShieldCheck,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      title: "Volume Normalizer",
      description: "Enhance audio volume with professional normalization and gain control.",
      href: "/tools/volume-normalizer",
      icon: Volume2,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Fade Effects",
      description: "Add professional fade in/out effects to create smooth audio transitions.",
      href: "/tools/fade-effect",
      icon: Wand2,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Metadata Editor",
      description: "Edit MP3 tags including title, artist, album, and year information.",
      href: "/tools/metadata-editor",
      icon: Edit3,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Audio Reverser",
      description: "Reverse audio playback completely for special effects and creative projects.",
      href: "/tools/audio-reverse",
      icon: RotateCcw,
      gradient: "from-cyan-500 to-teal-600"
    },
    {
      title: "3-Band EQ",
      description: "Adjust low, mid, and high frequencies with professional equalizer presets.",
      href: "/tools/equalizer",
      icon: Sliders,
      gradient: "from-emerald-500 to-green-600"
    }
  ]

  return (
    <>
      <Head>
        <title>Audio Tools - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Complete collection of professional audio processing tools. Choose from vocal removal, pitch adjustment, format conversion, and more." />
      </Head>

      <div className="min-h-screen">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Audio Processing
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block mt-2">
                Tools Collection
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional-grade audio processing tools for creators, musicians, and producers. 
              Transform your audio with cutting-edge technology.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {tools.map((tool, index) => (
              <div key={tool.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ToolCard
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                  icon={tool.icon}
                  gradient={tool.gradient}
                />
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="mt-20 text-center">
            <div className="glass-card">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-gray-300 mb-6">
                Each tool includes detailed instructions and supports multiple audio formats.
                Simply upload your file and let our advanced algorithms do the work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  View Documentation
                </button>
                <button className="btn-secondary">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}