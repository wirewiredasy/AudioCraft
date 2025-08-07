import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import ToolCard from '../components/ToolCard'
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
  Sliders,
  Play,
  Download,
  Star,
  Users,
  Zap
} from 'lucide-react'

export default function Home() {
  const features = [
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

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Play, value: "1M+", label: "Files Processed" },
    { icon: Download, value: "500K+", label: "Downloads" },
    { icon: Star, value: "4.9", label: "User Rating" }
  ]

  return (
    <>
      <Head>
        <title>ODOREMOVER Audio Suite - Professional Audio Processing Tools</title>
        <meta name="description" content="Transform your audio with professional tools. Remove vocals, adjust pitch, convert formats, and more with our advanced audio processing suite." />
      </Head>

      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in">
                Professional Audio
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                  Processing Suite
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 animate-slide-up">
                Transform your audio with our comprehensive collection of professional-grade tools. 
                Remove vocals, adjust pitch, convert formats, and enhance your audio with cutting-edge technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link href="/tools" className="btn-primary text-lg px-8 py-4">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Processing
                </Link>
                <Link href="#features" className="btn-secondary text-lg px-8 py-4">
                  <Play className="w-5 h-5 mr-2" />
                  View Features
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Audio Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 audio-wave opacity-20" />
          <div className="absolute top-40 right-20 w-16 h-16 audio-wave opacity-30" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 audio-wave opacity-25" style={{ animationDelay: '2s' }} />
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Powerful Audio Tools
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to process, enhance, and transform your audio files 
                with professional-grade quality and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <ToolCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  href={feature.href}
                  icon={feature.icon}
                  gradient={feature.gradient}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Audio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators, musicians, and audio professionals who trust 
              ODOREMOVER for their audio processing needs.
            </p>
            <Link href="/tools" className="btn-primary text-lg px-8 py-4">
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ODOREMOVER</span>
              </div>
              
              <p className="text-gray-400 mb-6">
                Professional audio processing tools for creators worldwide.
              </p>
              
              <div className="flex justify-center space-x-6">
                <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
                  Tools
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-500">
                  © 2024 ODOREMOVER Audio Suite. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}