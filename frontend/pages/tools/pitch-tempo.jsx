import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { OdoremoverLogo } from '../../components/ui/OdoremoverLogo'
import { 
  Upload, 
  Download, 
  Play, 
  Pause, 
  RotateCcw,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sliders,
  Music
} from 'lucide-react'
import { PitchTempoIcon } from '../../components/CustomIcons'

export default function PitchTempoEditor() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState(null)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [settings, setSettings] = useState({
    pitch: 0, // semitones (-12 to +12)
    tempo: 100, // percentage (50 to 200)
    preserveFormants: true
  })
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
      formData.append('pitch_shift', settings.pitch.toString())
      formData.append('tempo_change', (settings.tempo / 100).toString())
      formData.append('preserve_formants', settings.preserveFormants.toString())
      
      const response = await fetch('http://localhost:8000/pitch-tempo/', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Processing failed')
      }
      
      const result = await response.json()
      setProcessedFile(result)
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
    setProcessedFile(null)
    setError('')
    setIsProcessing(false)
    setSettings({
      pitch: 0,
      tempo: 100,
      preserveFormants: true
    })
  }

  const getPitchLabel = (pitch) => {
    if (pitch === 0) return 'Original'
    return `${pitch > 0 ? '+' : ''}${pitch} semitones`
  }

  const getTempoLabel = (tempo) => {
    if (tempo === 100) return 'Original'
    return `${tempo}%`
  }

  return (
    <>
      <Head>
        <title>Pitch & Tempo Editor - Advanced Audio Speed & Key Changer</title>
        <meta name="description" content="Change pitch and tempo independently with professional quality. Advanced audio editor for musicians, content creators, and audio professionals." />
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
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <OdoremoverLogo size={32} showText={true} textSize="xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Upload & Settings */}
            <div className="lg:col-span-2 space-y-8">
              {!file && !processedFile && (
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <PitchTempoIcon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Pitch & Tempo Editor</h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Change pitch and tempo independently without affecting audio quality. 
                    Perfect for musicians, DJs, and content creators.
                  </p>
                </div>
              )}

              {/* Upload Section */}
              {!file && !processedFile && (
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                      dragActive 
                        ? 'border-purple-500 bg-purple-500/10' 
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
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

              {/* File Info & Controls */}
              {file && !processedFile && (
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center mx-auto"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Audio...
                        </>
                      ) : (
                        <>
                          <Sliders className="w-5 h-5 mr-2" />
                          Apply Changes
                        </>
                      )}
                    </button>
                  </div>

                  {/* Progress Info */}
                  {isProcessing && (
                    <div className="mt-6 p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                        <div>
                          <p className="font-semibold text-purple-400">Processing Audio</p>
                          <p className="text-sm text-gray-400">
                            Applying pitch: {getPitchLabel(settings.pitch)}, tempo: {getTempoLabel(settings.tempo)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Results */}
              {processedFile && (
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-semibold">Audio Processed Successfully</h3>
                  </div>

                  <div className="bg-gray-900 border border-gray-600 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <PitchTempoIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Modified Audio</h4>
                          <p className="text-sm text-gray-400">
                            Pitch: {getPitchLabel(settings.pitch)}, Tempo: {getTempoLabel(settings.tempo)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(processedFile.processed_audio, 'pitch-tempo-modified.wav')}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Modified Audio
                    </button>
                  </div>

                  {/* Process Another */}
                  <div className="text-center">
                    <button
                      onClick={reset}
                      className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Process Another Audio
                    </button>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Settings Panel */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <Sliders className="w-5 h-5 mr-2 text-purple-400" />
                  Audio Settings
                </h3>

                {/* Pitch Control */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-300">Pitch Shift</label>
                    <span className="text-sm font-mono bg-gray-700 px-2 py-1 rounded">
                      {getPitchLabel(settings.pitch)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={settings.pitch}
                    onChange={(e) => setSettings(prev => ({ ...prev, pitch: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-purple"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-12</span>
                    <span>0</span>
                    <span>+12</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Adjust pitch in semitones without changing tempo
                  </p>
                </div>

                {/* Tempo Control */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-300">Tempo</label>
                    <span className="text-sm font-mono bg-gray-700 px-2 py-1 rounded">
                      {getTempoLabel(settings.tempo)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="5"
                    value={settings.tempo}
                    onChange={(e) => setSettings(prev => ({ ...prev, tempo: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-pink"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span>100%</span>
                    <span>200%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Change playback speed without affecting pitch
                  </p>
                </div>

                {/* Advanced Options */}
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-4">Advanced Options</h4>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.preserveFormants}
                      onChange={(e) => setSettings(prev => ({ ...prev, preserveFormants: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <div>
                      <span className="text-sm font-medium">Preserve Formants</span>
                      <p className="text-xs text-gray-400">Maintain natural vocal characteristics</p>
                    </div>
                  </label>
                </div>

                {/* Reset Button */}
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <button
                    onClick={() => setSettings({ pitch: 0, tempo: 100, preserveFormants: true })}
                    className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-6">
                <h4 className="font-semibold text-purple-400 mb-3">Pro Tips:</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Use ±3 semitones for subtle key changes</li>
                  <li>• 125% tempo great for workout music</li>
                  <li>• Preserve formants for vocal content</li>
                  <li>• Combine settings for creative effects</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sliders className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Independent Control</h3>
              <p className="text-gray-400 text-sm">Change pitch and tempo separately with precision</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-gray-400 text-sm">Professional algorithms preserve audio quality</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Formant Preservation</h3>
              <p className="text-gray-400 text-sm">Keep vocals natural when changing pitch</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6, #A855F7);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .slider-pink::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EC4899, #F472B6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </>
  )
}