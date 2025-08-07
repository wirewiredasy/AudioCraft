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
  User,
  Play,
  TrendingUp,
  BarChart3,
  Volume2,
  Scissors,
  Edit3,
  Wand2,
  RotateCcw,
  Upload,
  Download,
  Equalizer3,
  FileAudio,
  Waves,
  Filter,
  Shuffle,
  MoreHorizontal,
  Search,
  Bell,
  Home,
  LayoutDashboard
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vocal', label: 'Vocal', icon: Mic, color: 'bg-blue-500' },
    { id: 'pitch', label: 'Pitch Editor', icon: TrendingUp, color: 'bg-purple-500' },
    { id: 'equalizer', label: 'Equalizer', icon: BarChart3, color: 'bg-teal-500' },
    { id: 'equalize', label: 'Equalize', icon: Sliders, color: 'bg-cyan-500' },
    { id: 'metadata', label: 'Metadata', icon: Edit3, color: 'bg-gray-500' },
    { id: 'nopixce', label: 'Nopixce', icon: ShieldCheck, color: 'bg-pink-500' },
    { id: 'more', label: 'MoreSerial', icon: MoreHorizontal, color: 'bg-slate-600' },
    { id: 'script', label: 'ScriptRant', icon: FileAudio, color: 'bg-slate-600' }
  ]

  const tools = [
    {
      title: "Noise Removal",
      subtitle: "Upmlixaore",
      description: "Remove background noise and enhance audio clarity",
      icon: () => (
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
          U
        </div>
      ),
      status: "Active",
      action: "Open",
      href: "/tools/vocal-remover"
    },
    {
      title: "Audio Analysis",
      subtitle: "Regualez",
      description: "Advanced audio frequency analysis and visualization",
      icon: () => (
        <div className="w-full h-full bg-slate-800 rounded-xl flex flex-col items-center justify-center p-3">
          <div className="flex space-x-1 mb-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-sm"
                style={{ height: `${Math.random() * 20 + 10}px` }}
              />
            ))}
          </div>
          <div className="w-4 h-4 bg-cyan-400 rounded-full"/>
        </div>
      ),
      status: "Processing",
      action: "Ooflia Isna",
      href: "/tools/equalizer"
    },
    {
      title: "Voice Enhancer", 
      subtitle: "Motlion",
      description: "Enhance and optimize voice recordings",
      icon: () => (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white">
          <Mic className="w-8 h-8" />
        </div>
      ),
      status: "Ready",
      action: "Configure",
      href: "/tools/pitch-tempo"
    },
    {
      title: "Recent Uploads",
      subtitle: "Deageim Unotstir",
      description: "Manage and process your uploaded audio files",
      icon: () => (
        <div className="w-full h-full bg-slate-800 rounded-xl p-3">
          <div className="space-y-2">
            <div className="h-1 bg-cyan-300 rounded-full w-full"/>
            <div className="h-1 bg-cyan-300 rounded-full w-3/4"/>
            <div className="h-1 bg-cyan-300 rounded-full w-1/2"/>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-gray-400">004</span>
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"/>
            </div>
          </div>
        </div>
      ),
      status: "Active",
      action: "Odpore",
      href: "/tools/converter"
    },
    {
      title: "Red Process",
      subtitle: "Noiran",
      description: "Advanced audio processing pipeline",
      icon: () => (
        <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-300 rounded-xl flex items-center justify-center">
          <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-6 bg-red-500 rounded-full"/>
          </div>
        </div>
      ),
      status: "Processing",
      action: "Monitor",
      href: "/tools/noise-reducer"
    },
    {
      title: "Noise Filter",
      subtitle: "Noize",
      description: "Remove unwanted noise from audio recordings",
      icon: () => (
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Filter className="w-8 h-8 text-white" />
        </div>
      ),
      status: "Ready",
      action: "Configure",
      href: "/tools/volume-normalizer"
    }
  ]

  return (
    <>
      <Head>
        <title>Odoremover Pro - Professional Audio Dashboard</title>
        <meta name="description" content="Professional audio processing dashboard with advanced tools" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col">
          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Soupfant</h3>
                <p className="text-sm text-gray-500">Soupfent</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${item.color || 'bg-gray-200'}`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                  Odoremover Pro
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  Songs
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Setup
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Odoremover Pro</h1>
              <p className="text-gray-600">Professional audio processing dashboard</p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Link 
                  key={tool.title}
                  href={tool.href}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                    </div>
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Tool Icon */}
                  <div className="w-full h-24 mb-4">
                    <tool.icon />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{tool.subtitle}</h4>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded" />
                        <span className="text-sm text-gray-600">{tool.action}</span>
                      </div>
                      <div className="w-4 h-4 bg-gray-300 rounded" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Audio Player */}
            <div className="mt-8 bg-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                    +
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm">
                    Non
                  </button>
                  <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    5
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm">
                    4kb
                  </button>
                  <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                    ♥
                  </button>
                  <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    🎵
                  </button>
                  <button className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white">
                    ⚙
                  </button>
                  <button className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white">
                    📁
                  </button>
                </div>
              </div>

              {/* Waveform */}
              <div className="h-20 bg-slate-700 rounded-lg flex items-end justify-center space-x-1 p-2">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-teal-400 to-blue-400 rounded-sm"
                    style={{
                      width: '2px',
                      height: `${10 + Math.sin(i * 0.2) * 30 + Math.random() * 20}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}