import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Upload, Zap, ShieldCheck, Music, Star, TrendingUp, Award } from 'lucide-react'
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
} from './CustomIcons'
import { ResponsiveContainer, ResponsiveGrid, AdaptiveButton } from './ResponsiveLayout'

export const EnhancedHero = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [audioWaves, setAudioWaves] = useState([])

  // Initialize audio wave animation
  useEffect(() => {
    const waves = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 20,
      delay: i * 0.1
    }))
    setAudioWaves(waves)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(stepInterval)
  }, [])

  const processingSteps = [
    { 
      title: 'Upload Audio', 
      description: 'Select your music file',
      icon: Upload,
      color: 'text-blue-400'
    },
    { 
      title: 'AI Processing', 
      description: 'Advanced algorithms work',
      icon: Zap,
      color: 'text-yellow-400'
    },
    { 
      title: 'Download Result', 
      description: 'Get your processed audio',
      icon: ShieldCheck,
      color: 'text-green-400'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process audio files in seconds with advanced AI algorithms',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: ShieldCheck,
      title: '100% Secure',
      description: 'Your files are encrypted and automatically deleted after processing',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Music,
      title: 'Studio Quality',
      description: 'Professional-grade results with lossless audio processing',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: 'Trusted by musicians, creators, and audio professionals worldwide',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ]

  const tools = [
    { 
      icon: VocalRemoverIcon, 
      name: 'Vocal Remover', 
      description: 'AI-powered vocal isolation',
      href: '/tools/vocal-remover',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      popular: true
    },
    { 
      icon: PitchTempoIcon, 
      name: 'Pitch & Tempo', 
      description: 'Adjust pitch and speed independently',
      href: '/tools/pitch-tempo',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    { 
      icon: ConverterIcon, 
      name: 'Audio Converter', 
      description: 'Convert between audio formats',
      href: '/tools/converter',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    { 
      icon: AudioSplitterIcon, 
      name: 'Audio Splitter', 
      description: 'Separate stereo channels',
      href: '/tools/audio-splitter',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    { 
      icon: KaraokeIcon, 
      name: 'Karaoke Maker', 
      description: 'Create karaoke tracks instantly',
      href: '/tools/karaoke',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    },
    {
      icon: NoiseReductionIcon,
      name: 'Noise Reducer',
      description: 'Remove background noise from audio',
      href: '/tools/noise-reduction',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: VolumeNormalizerIcon,
      name: 'Volume Normalizer',
      description: 'Normalize audio volume levels',
      href: '/tools/volume-normalizer',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: EqualizerIcon,
      name: 'Audio Equalizer',
      description: 'Fine-tune frequency response',
      href: '/tools/equalizer',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    },
    {
      icon: RecorderIcon,
      name: 'Audio Recorder',
      description: 'Record high-quality audio',
      href: '/tools/recorder',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: CutterJoinerIcon,
      name: 'Cutter & Joiner',
      description: 'Cut and join audio segments',
      href: '/tools/cutter-joiner',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: MetadataEditorIcon,
      name: 'Metadata Editor',
      description: 'Edit audio file information',
      href: '/tools/metadata-editor',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: AudioReverseIcon,
      name: 'Audio Reverse',
      description: 'Reverse audio playback',
      href: '/tools/audio-reverse',
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/10'
    },
    {
      icon: FadeEffectIcon,
      name: 'Fade Effect',
      description: 'Add fade in/out effects',
      href: '/tools/fade-effect',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      {/* Main Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24">
        <ResponsiveContainer>
          <div className="text-center">
            {/* Logo and Branding */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <OdoremoverLogo className="w-20 h-20 lg:w-24 lg:h-24 text-white" />
                <div className="absolute inset-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
              </div>
            </div>

            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                ODOREMOVER
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-400 mb-6">
                Professional Audio Processing Suite
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your audio with cutting-edge AI technology. Remove vocals, adjust pitch, convert formats, and unlock the full potential of your music.
              </p>
            </div>

            {/* Audio Visualization */}
            <div className="mb-12">
              <div className="flex justify-center items-end space-x-1 h-24 mb-6">
                {audioWaves.map(wave => (
                  <div
                    key={wave.id}
                    className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-pulse"
                    style={{
                      height: `${wave.height}%`,
                      animationDelay: `${wave.delay}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">Real-time audio processing visualization</p>
            </div>

            {/* CTA Button */}
            <div className="mb-16">
              <AdaptiveButton
                size="lg"
                fullWidthOnMobile
                className="btn-glow relative overflow-hidden group"
                onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Upload className="w-6 h-6 mr-3" />
                Start Processing Audio
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
              </AdaptiveButton>
            </div>

            {/* Stats */}
            {/* Statistics section removed */}
          </div>
        </ResponsiveContainer>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 relative">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Simple, fast, and professional results in three steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {processingSteps.map((step, index) => (
              <div
                key={index}
                className={`relative p-8 glass-card text-center transition-all duration-500 ${
                  currentStep === index ? 'scale-105 glow-blue' : 'opacity-75'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${
                  index === 0 ? 'from-blue-500 to-cyan-500' :
                  index === 1 ? 'from-yellow-500 to-orange-500' :
                  'from-green-500 to-emerald-500'
                } flex items-center justify-center`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>

                {/* Step indicator */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ODOREMOVER?</h2>
            <p className="text-xl text-gray-300">Cutting-edge technology meets user-friendly design</p>
          </div>

          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 2 }} gap={8}>
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 mb-6 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </ResponsiveGrid>
        </ResponsiveContainer>
      </section>

      {/* Tools Preview Section */}
      <section id="tools" className="py-16 lg:py-24">
        <ResponsiveContainer>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Audio Tools</h2>
            <p className="text-xl text-gray-300">Everything you need for professional audio processing</p>
          </div>

          <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap={6}>
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <div className={`${tool.bgColor} glass-card p-6 hover:scale-105 transition-all duration-300 group relative`}>
                  {tool.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-1 rounded-full font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <tool.icon className={`w-12 h-12 ${tool.color} mr-4`} />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
                      Try Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ResponsiveGrid>

          <div className="text-center mt-12">
            <AdaptiveButton variant="secondary" size="lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              View All Tools
            </AdaptiveButton>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  )
}

export default EnhancedHero