import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { OdoremoverLogo } from '../../components/ui/OdoremoverLogo'
import { 
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
  Waveform
} from 'lucide-react'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function AudioSplitter() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFiles, setProcessedFiles] = useState(null)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
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
      
      const response = await fetch('http://localhost:8000/audio-splitter/', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Processing failed')
      }
      
      const result = await response.json()
      setProcessedFiles(result)
    } catch (err) {
      setError('Failed to process audio. Please try again.')
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
        <title>Audio Splitter - Split Stereo Audio into Left/Right Channels</title>
        <meta name="description" content="Split stereo audio files into separate left and right channel tracks. Free online audio splitter tool with high quality results." />
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
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Audio Splitter</h1>
                    <p className="text-sm text-gray-400">Split Stereo Channels</p>
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
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Audio Splitter</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Split stereo audio files into separate left and right channel tracks. 
                Perfect for extracting individual channels from music recordings.
              </p>
            </div>
          )}

          {/* Upload Section */}
          {!file && !processedFiles && (
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 mb-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Choose Audio File</h3>
                <p className="text-gray-400 mb-6">
                  Drag and drop your audio file here or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
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
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{file.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center mx-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Splitting Audio...
                    </>
                  ) : (
                    <>
                      <Waveform className="w-5 h-5 mr-2" />
                      Split Audio Channels
                    </>
                  )}
                </button>
              </div>

              {/* Progress Info */}
              {isProcessing && (
                <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                    <div>
                      <p className="font-semibold text-blue-400">Processing Audio</p>
                      <p className="text-sm text-gray-400">Separating left and right channels...</p>
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
                <h3 className="text-xl font-semibold">Audio Split Successfully</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Channel */}
                <div className="bg-gray-900 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-400 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Left Channel</h4>
                        <p className="text-sm text-gray-400">Isolated left audio</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(processedFiles.left_channel, 'left_channel.wav')}
                    className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Left
                  </button>
                </div>

                {/* Right Channel */}
                <div className="bg-gray-900 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Right Channel</h4>
                        <p className="text-sm text-gray-400">Isolated right audio</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(processedFiles.right_channel, 'right_channel.wav')}
                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Right
                  </button>
                </div>
              </div>

              {/* Process Another */}
              <div className="text-center">
                <button
                  onClick={reset}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Split Another Audio
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
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Channel Separation</h3>
              <p className="text-gray-400 text-sm">Clean separation of left and right stereo channels</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-gray-400 text-sm">Preserve original audio quality during splitting</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Download</h3>
              <p className="text-gray-400 text-sm">Download both channels as separate audio files</p>
            </div>
          </div>
        </div>
        
        {/* Recommended Tools */}
        <div className="mt-8">
          <RecommendedTools currentTool="audio-splitter" maxTools={4} />
        </div>
      </div>
    </>
  )
}