import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { 
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

const allTools = [
  {
    icon: VocalRemoverIcon,
    name: 'Vocal Remover',
    description: 'AI-powered vocal isolation',
    href: '/tools/vocal-remover',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    key: 'vocal-remover'
  },
  {
    icon: PitchTempoIcon,
    name: 'Pitch & Tempo',
    description: 'Adjust pitch and speed',
    href: '/tools/pitch-tempo',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    key: 'pitch-tempo'
  },
  {
    icon: ConverterIcon,
    name: 'Audio Converter',
    description: 'Convert audio formats',
    href: '/tools/converter',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    key: 'converter'
  },
  {
    icon: AudioSplitterIcon,
    name: 'Audio Splitter',
    description: 'Separate stereo channels',
    href: '/tools/audio-splitter',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    key: 'audio-splitter'
  },
  {
    icon: KaraokeIcon,
    name: 'Karaoke Maker',
    description: 'Create karaoke tracks',
    href: '/tools/karaoke',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    key: 'karaoke'
  },
  {
    icon: NoiseReductionIcon,
    name: 'Noise Reducer',
    description: 'Remove background noise',
    href: '/tools/noise-reduction',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    key: 'noise-reduction'
  },
  {
    icon: VolumeNormalizerIcon,
    name: 'Volume Normalizer',
    description: 'Normalize audio levels',
    href: '/tools/volume-normalizer',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    key: 'volume-normalizer'
  },
  {
    icon: EqualizerIcon,
    name: 'Audio Equalizer',
    description: 'Fine-tune frequencies',
    href: '/tools/equalizer',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    key: 'equalizer'
  },
  {
    icon: RecorderIcon,
    name: 'Audio Recorder',
    description: 'Record high-quality audio',
    href: '/tools/recorder',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    key: 'recorder'
  },
  {
    icon: CutterJoinerIcon,
    name: 'Cutter & Joiner',
    description: 'Cut and join audio',
    href: '/tools/cutter-joiner',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    key: 'cutter-joiner'
  },
  {
    icon: MetadataEditorIcon,
    name: 'Metadata Editor',
    description: 'Edit file information',
    href: '/tools/metadata-editor',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    key: 'metadata-editor'
  },
  {
    icon: AudioReverseIcon,
    name: 'Audio Reverse',
    description: 'Reverse audio playback',
    href: '/tools/audio-reverse',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    key: 'audio-reverse'
  },
  {
    icon: FadeEffectIcon,
    name: 'Fade Effect',
    description: 'Add fade effects',
    href: '/tools/fade-effect',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    key: 'fade-effect'
  }
]

export const RecommendedTools = ({ currentTool, maxTools = 4 }) => {
  // Filter out current tool and get random recommendations
  const otherTools = allTools.filter(tool => tool.key !== currentTool)
  const recommendedTools = otherTools
    .sort(() => Math.random() - 0.5)
    .slice(0, maxTools)

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <ArrowRight className="w-5 h-5 mr-2 text-blue-400" />
        Other Tools You Might Like
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {recommendedTools.map((tool, index) => (
          <Link key={index} href={tool.href}>
            <div className={`${tool.bgColor} p-4 rounded-xl hover:scale-105 transition-all duration-300 group cursor-pointer`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center">
                  <tool.icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Link href="/tools">
          <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
            View All Tools →
          </span>
        </Link>
      </div>
    </div>
  )
}

export default RecommendedTools