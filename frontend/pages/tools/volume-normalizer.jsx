import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, Volume2, BarChart3, TrendingUp } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function VolumeNormalizer() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [targetLevel, setTargetLevel] = useState(-6.0)
  const [normalize, setNormalize] = useState(true)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for normalization!')
      } else {
        toast.error('Please select an audio file')
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg', '.m4a', '.aac']
    },
    multiple: false
  })

  const processAudio = async () => {
    if (!audioFile) {
      toast.error('Please select an audio file first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('target_level', targetLevel.toString())
    formData.append('normalize', normalize.toString())

    try {
      const response = await axios.post('/api/volume-normalizer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success('Volume normalization completed!')
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadAudio = () => {
    if (processedAudio) {
      const a = document.createElement('a')
      a.href = processedAudio
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_normalized.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <>
      <Head>
        <title>Volume Normalizer - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Normalize and boost audio volume to professional standards" />
      </Head>

      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <ArrowLeft className="w-5 h-5" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Volume Normalizer</span>
                </div>
              </Link>
              <div className="text-sm text-gray-500">
                ODOREMOVER Audio Suite
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Volume Normalizer</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Normalize and boost audio volume to professional standards with consistent levels across all files
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upload Audio</h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for normalization</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your audio file here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Level (dB): {targetLevel}
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">-20</span>
                    <input
                      type="range"
                      min="-20"
                      max="0"
                      step="0.5"
                      value={targetLevel}
                      onChange={(e) => setTargetLevel(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-gray-500">0</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Recommended: -6 dB for music, -12 dB for speech
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="normalize"
                    checked={normalize}
                    onChange={(e) => setNormalize(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="normalize" className="text-sm font-medium text-gray-700">
                    Enable RMS normalization
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Target Level Guide</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div className="flex justify-between">
                      <span>-23 dB LUFS</span>
                      <span>Broadcast TV</span>
                    </div>
                    <div className="flex justify-between">
                      <span>-16 dB LUFS</span>
                      <span>Spotify/Apple Music</span>
                    </div>
                    <div className="flex justify-between">
                      <span>-14 dB LUFS</span>
                      <span>YouTube</span>
                    </div>
                    <div className="flex justify-between">
                      <span>-6 dB</span>
                      <span>Mastering Peak</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isProcessing ? 'Normalizing Audio...' : 'Normalize Audio'}
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              
              {processedAudio ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Normalized Audio</h3>
                    <audio controls className="w-full mb-4">
                      <source src={processedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                      onClick={downloadAudio}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Normalized Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Normalized audio will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Audio Normalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">RMS Normalization</h4>
                <p>Analyzes the average loudness level and adjusts gain to match professional broadcasting standards.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Peak Limiting</h4>
                <p>Prevents digital clipping while maximizing loudness, ensuring clean, distortion-free audio output.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}