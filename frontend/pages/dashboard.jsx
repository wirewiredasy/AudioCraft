import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Menu,
  X,
  User,
  Settings,
  Clock,
  Download,
  Trash2,
  Play,
  FileAudio,
  BarChart3,
  TrendingUp
} from 'lucide-react'
import {
  OdoremoverLogo,
  VocalRemoverIcon,
  AudioSplitterIcon,
  PitchTempoIcon,
  ConverterIcon,
  RecorderIcon,
  KaraokeIcon,
  AccountIcon
} from '../components/CustomIcons'

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    profileImage: null,
    joinedDate: '2024-01-15'
  }

  // Mock processing history
  const processingHistory = [
    {
      id: 1,
      tool: 'Vocal Remover',
      icon: VocalRemoverIcon,
      fileName: 'Song_Track_01.mp3',
      processedAt: '2024-08-07 14:30',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      tool: 'Pitch Tempo',
      icon: PitchTempoIcon,
      fileName: 'Background_Music.wav',
      processedAt: '2024-08-07 12:15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      tool: 'Audio Splitter',
      icon: AudioSplitterIcon,
      fileName: 'Stereo_Recording.flac',
      processedAt: '2024-08-06 18:45',
      status: 'completed',
      downloadUrl: '#'
    }
  ]

  // Quick access tools
  const quickTools = [
    { 
      icon: VocalRemoverIcon, 
      label: 'Vocal Remover', 
      href: '/tools/vocal-remover',
      color: 'blue'
    },
    { 
      icon: PitchTempoIcon, 
      label: 'Pitch & Tempo', 
      href: '/tools/pitch-tempo',
      color: 'purple'
    },
    { 
      icon: AudioSplitterIcon, 
      label: 'Audio Splitter', 
      href: '/tools/audio-splitter',
      color: 'green'
    },
    { 
      icon: ConverterIcon, 
      label: 'Converter', 
      href: '/tools/converter',
      color: 'cyan'
    }
  ]

  return (
    <>
      <Head>
        <title>Dashboard - ODOREMOVER Audio Processing Suite</title>
        <meta name="description" content="Your ODOREMOVER dashboard. Manage your audio projects, view processing history, and access all audio tools." />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <OdoremoverLogo size={32} showText={true} textSize="xl" />
              </Link>
              <div className="hidden md:block h-6 w-px bg-gray-600"></div>
              <div className="hidden md:block">
                <span className="text-gray-400 text-sm">Dashboard</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
            <p className="text-gray-400">Ready to process some audio today?</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileAudio className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-400">Files Processed</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.4h</p>
                  <p className="text-sm text-gray-400">Processing Time</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-gray-400">Downloads</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Tools */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6">Quick Access Tools</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickTools.map((tool, index) => (
                  <Link key={index} href={tool.href} className="group">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:bg-gray-700 transition-colors text-center">
                      <tool.icon className={`w-8 h-8 text-${tool.color}-400 mb-3 mx-auto`} />
                      <h3 className="text-sm font-semibold">{tool.label}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Processing History */}
              <h2 className="text-xl font-bold mb-6">Recent Processing History</h2>
              <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="divide-y divide-gray-700">
                  {processingHistory.map((item) => (
                    <div key={item.id} className="p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.fileName}</h3>
                          <p className="text-sm text-gray-400">
                            {item.tool} • {item.processedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-700 text-center">
                  <Link href="/history" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View All History
                  </Link>
                </div>
              </div>
            </div>

            {/* Account Sidebar */}
            <div>
              <h2 className="text-xl font-bold mb-6">Account</h2>
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Member since {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Account Settings</span>
                  </Link>
                  
                  <Link href="/history" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Processing History</span>
                  </Link>

                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors text-red-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-400 mb-3">Usage This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Audio Files</span>
                    <span className="text-sm font-medium">24 / 100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '24%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-300">Processing Time</span>
                    <span className="text-sm font-medium">2.4h / 10h</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full" style={{width: '24%'}}></div>
                  </div>
                </div>
                
                <Link href="/upgrade" className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-semibold text-center transition-all mt-4">
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}