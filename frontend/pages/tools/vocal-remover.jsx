import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { OdoremoverLogo } from '../../components/ui/OdoremoverLogo'
import { 
  ArrowLeft, 
  Upload, 
  Settings, 
  HelpCircle, 
  Play, 
  Pause, 
  Volume2, 
  Download,
  Sparkles,
  FileAudio,
  X,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function VocalRemover() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [processed, setProcessed] = useState(false)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
    setProcessed(false)
    setProcessing(false)
  }

  const processAudio = () => {
    setProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setProcessing(false)
      setProcessed(true)
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Vocal Remover - Odoremover</title>
        <meta name="description" content="Remove vocals from your audio files with professional quality" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <OdoremoverLogo size={32} showText={true} textSize="xl" className="text-gray-900" />
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center space-x-2">
                  <span>Home</span>
                </Link>
                <Link href="/settings" className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </Link>
              </nav>

              {/* Right Side */}
              <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                Setup
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Vocal Remover
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Remove vocals from your audio files with professional AI technology
            </p>
          </div>

          {/* Main Tool Interface */}
          <div className="relative">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
              
              {!file ? (
                /* Upload Zone */
                <div 
                  className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-orange-500 bg-orange-500/10 scale-105' 
                      : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileSelect}
                  />
                  
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                    <Upload className="w-8 h-8 text-gray-500" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Drag & Drop your audio file here
                  </h3>
                  
                  <p className="text-gray-600 mb-8">
                    Supported file formats: MP3, WAV, FLAC, M4A, OGG
                  </p>
                  
                  <div className="text-sm text-gray-500">
                    Maximum file size: 50MB
                  </div>
                </div>
              ) : (
                /* Audio Player Interface */
                <div className="space-y-8">
                  {/* File Info */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <FileAudio className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-gray-900 font-medium">{file.name}</p>
                        <p className="text-gray-500 text-sm">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={removeFile}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Audio Player Controls */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center justify-center space-x-6 mb-8">
                      <button className="p-3 rounded-full bg-slate-700 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
                        </svg>
                      </button>
                      
                      <button className="p-3 rounded-full bg-slate-700 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 14.5v-9l7 4.5-7 4.5z"/>
                        </svg>
                      </button>
                      
                      <button 
                        className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </button>
                      
                      <button className="p-3 rounded-full bg-slate-700 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                        </svg>
                      </button>
                      
                      <button className="p-3 rounded-full bg-slate-700 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="mb-8">
                      <div className="flex items-end justify-center h-32 space-x-1">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-gradient-to-t from-orange-500 via-purple-500 to-transparent rounded-sm animate-pulse"
                            style={{
                              width: '3px',
                              height: `${20 + Math.sin(i * 0.3) * 40 + Math.random() * 30}%`,
                              animationDelay: `${i * 0.05}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center space-x-4">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                        />
                        <div 
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full pointer-events-none"
                          style={{ width: `${volume}%` }}
                        />
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 7v10h4l5 5V2L7 7H3zm13.5 3c0 1.77-1.02 3.29-2.5 4.03v2.21c2.89-.86 5-3.54 5-6.24s-2.11-5.38-5-6.24v2.21c1.48.74 2.5 2.26 2.5 4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Process/Download Button */}
                  <div className="text-center">
                    {!processed && !processing && (
                      <button 
                        onClick={processAudio}
                        className="px-12 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
                      >
                        Remove Vocals
                      </button>
                    )}

                    {processing && (
                      <div className="flex items-center justify-center space-x-4 py-4">
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                        <span className="text-gray-900 font-medium">Processing audio...</span>
                      </div>
                    )}

                    {processed && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-3 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium">Processing complete!</span>
                        </div>
                        
                        <button className="group relative px-12 py-4 bg-green-600 text-white rounded-full font-semibold text-lg hover:bg-green-700 hover:scale-105 transition-all shadow-lg overflow-hidden">
                          <span className="flex items-center space-x-3 relative z-10">
                            <Download className="w-5 h-5" />
                            <span>Download</span>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { height: 20%; }
          50% { height: 80%; }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(to right, #f97316, #9333ea);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(to right, #f97316, #9333ea);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </>
  )
}