import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { 
  Mic, 
  Music, 
  Upload, 
  Download, 
  Play, 
  Pause, 
  RotateCcw,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Volume2,
  Star
} from 'lucide-react'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function KaraokeMaker() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState(null)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [qualityLevel, setQualityLevel] = useState('high')
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
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile)
      setError('')
    } else {
      setError('Please upload a valid audio file')
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
    }
  }

  const processAudio = async () => {
    if (!file) return
    
    setIsProcessing(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('audio_file', file)
      formData.append('quality', qualityLevel)
      
      // Use vocal remover endpoint for karaoke creation
      const response = await fetch('http://localhost:8000/vocal-remover/', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Processing failed')
      }
      
      const result = await response.json()
      setProcessedFiles(result)
    } catch (err) {
      setError('Failed to create karaoke track. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = (url, filename) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const reset = () => {
    setFile(null)
    setProcessedFiles(null)
    setError('')
    setIsProcessing(false)
  }

  return (
    <>
      <Head>
        <title>Karaoke Maker - Create Karaoke Tracks from Any Song</title>
        <meta name="description" content="Create professional karaoke tracks by removing vocals from any song. AI-powered vocal removal for perfect instrumental versions." />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </Link>
                <div className="h-6 w-px bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Karaoke Maker</h1>
                    <p className="text-sm text-gray-400">Create Perfect Karaoke Tracks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {!file && !processedFiles && (
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Karaoke Maker</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Transform any song into a professional karaoke track by removing vocals with AI. 
                Perfect for singing along, practice sessions, or karaoke parties.
              </p>
              
              {/* Quality Selection */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-800 rounded-lg p-2 flex space-x-1">
                  <button
                    onClick={() => setQualityLevel('standard')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      qualityLevel === 'standard'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setQualityLevel('high')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      qualityLevel === 'high'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    High Quality
                  </button>
                  <button
                    onClick={() => setQualityLevel('premium')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      qualityLevel === 'premium'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Premium
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Section */}
          {!file && !processedFiles && (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-pink-500 bg-pink-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Choose Your Song</h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop your audio file here or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-4">
                  Supports MP3, WAV, FLAC, AAC, OGG and more
                </p>
              </div>
            </div>
          )}

          {/* File Selected */}
          {file && !processedFiles && (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{file.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB • {qualityLevel} quality
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Process Button */}
              <div className="text-center">
                <button
                  onClick={processAudio}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center mx-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Karaoke Track...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      Create Karaoke Track
                    </>
                  )}
                </button>
              </div>

              {/* Progress Info */}
              {isProcessing && (
                <div className="mt-6 p-4 bg-pink-900/30 border border-pink-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin text-pink-400" />
                    <div>
                      <p className="font-semibold text-pink-400">Processing Audio</p>
                      <p className="text-sm text-gray-400">Removing vocals with AI technology...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {processedFiles && (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold">Karaoke Track Created Successfully</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Karaoke (Instrumental) */}
                <div className="bg-gray-900 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Karaoke Track</h4>
                        <p className="text-sm text-gray-400">Vocals removed</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(processedFiles.karaoke, 'karaoke.wav')}
                    className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Karaoke
                  </button>
                </div>

                {/* Vocals (Acapella) */}
                <div className="bg-gray-900 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Vocals Only</h4>
                        <p className="text-sm text-gray-400">Isolated vocals</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(processedFiles.vocals, 'vocals.wav')}
                    className="w-full bg-pink-600 hover:bg-pink-700 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Vocals
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-400 mb-2">Karaoke Tips:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Adjust your microphone volume to match the instrumental</li>
                  <li>• Use headphones to avoid feedback during recording</li>
                  <li>• The vocal track can help you learn the melody and timing</li>
                </ul>
              </div>

              {/* Process Another */}
              <div className="text-center">
                <button
                  onClick={reset}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Create Another Karaoke Track
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">Advanced AI technology for clean vocal removal</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Studio Quality</h3>
              <p className="text-gray-400 text-sm">Professional-grade karaoke tracks for any song</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dual Output</h3>
              <p className="text-gray-400 text-sm">Get both karaoke and acapella versions</p>
            </div>
          </div>
        </div>
        
        {/* Recommended Tools */}
        <div className="mt-8">
          <RecommendedTools currentTool="karaoke" maxTools={4} />
        </div>
      </div>
    </>
  )
}