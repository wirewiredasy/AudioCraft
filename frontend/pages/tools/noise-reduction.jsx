import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, ShieldCheck, Volume2, Sliders } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function NoiseReduction() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [reductionStrength, setReductionStrength] = useState(0.8)
  const [isStationary, setIsStationary] = useState(true)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for processing!')
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
    formData.append('reduction_strength', reductionStrength.toString())
    formData.append('stationary', isStationary.toString())

    try {
      const response = await axios.post('/api/noise-reduction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success('Noise reduction completed!')
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
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_noise_reduced.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <>
      <Head>
        <title>Noise Reduction - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Remove background noise from audio using advanced algorithms" />
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
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Noise Reduction</span>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Noise Reduction</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Remove background noise and enhance audio clarity using advanced spectral subtraction algorithms
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
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for noise reduction</p>
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
                    Noise Reduction Strength: {reductionStrength.toFixed(1)}
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">Mild</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={reductionStrength}
                      onChange={(e) => setReductionStrength(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-gray-500">Strong</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="stationary"
                    checked={isStationary}
                    onChange={(e) => setIsStationary(e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="stationary" className="text-sm font-medium text-gray-700">
                    Stationary Noise (constant background noise)
                  </label>
                </div>
              </div>

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isProcessing ? 'Reducing Noise...' : 'Process Audio'}
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              
              {processedAudio ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Processed Audio</h3>
                    <audio controls className="w-full mb-4">
                      <source src={processedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                      onClick={downloadAudio}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Clean Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <Volume2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Processed audio will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How Noise Reduction Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Spectral Subtraction</h4>
                <p>Analyzes frequency spectrum to identify and remove unwanted background noise while preserving audio content.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Adaptive Processing</h4>
                <p>Automatically adjusts reduction strength based on noise characteristics and audio content detection.</p>
              </div>
            </div>
          </div>
          
          {/* Recommended Tools */}
          <div className="mt-8">
            <RecommendedTools currentTool="noise-reduction" maxTools={4} />
          </div>
        </div>
      </div>
    </>
  )
}