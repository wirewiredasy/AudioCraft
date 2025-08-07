import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, Equalizer3, BarChart3 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function Equalizer() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [lowGain, setLowGain] = useState(0.0)
  const [midGain, setMidGain] = useState(0.0)
  const [highGain, setHighGain] = useState(0.0)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for equalization!')
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
    formData.append('low_gain', lowGain.toString())
    formData.append('mid_gain', midGain.toString())
    formData.append('high_gain', highGain.toString())

    try {
      const response = await axios.post('http://localhost:8000/equalizer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success('Equalization applied successfully!')
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
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_equalized.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const resetEQ = () => {
    setLowGain(0.0)
    setMidGain(0.0)
    setHighGain(0.0)
  }

  return (
    <>
      <Head>
        <title>Audio Equalizer - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Professional 3-band equalizer for frequency control and audio fine-tuning" />
      </Head>

      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <ArrowLeft className="w-5 h-5" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Equalizer3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Audio Equalizer</span>
                </div>
              </Link>
              <div className="text-sm text-gray-500">ODOREMOVER Audio Suite</div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Audio Equalizer</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional 3-band equalizer with low, mid, and high frequency adjustment to fine-tune your audio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upload Audio</h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-cyan-500 bg-cyan-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for equalization</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your audio file here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              {/* EQ Controls */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">3-Band Equalizer</h3>
                  <button
                    onClick={resetEQ}
                    className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    Reset EQ
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Low Frequencies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Low (60-250 Hz): {lowGain > 0 ? '+' : ''}{lowGain.toFixed(1)} dB
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">-12</span>
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.5"
                        value={lowGain}
                        onChange={(e) => setLowGain(parseFloat(e.target.value))}
                        className="flex-1 h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-gray-500">+12</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Bass, kick drum, bass guitar</p>
                  </div>

                  {/* Mid Frequencies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mid (250-4000 Hz): {midGain > 0 ? '+' : ''}{midGain.toFixed(1)} dB
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">-12</span>
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.5"
                        value={midGain}
                        onChange={(e) => setMidGain(parseFloat(e.target.value))}
                        className="flex-1 h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-gray-500">+12</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Vocals, piano, guitar, most instruments</p>
                  </div>

                  {/* High Frequencies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      High (4000-20000 Hz): {highGain > 0 ? '+' : ''}{highGain.toFixed(1)} dB
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">-12</span>
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.5"
                        value={highGain}
                        onChange={(e) => setHighGain(parseFloat(e.target.value))}
                        className="flex-1 h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-gray-500">+12</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Cymbals, hi-hats, air, brightness</p>
                  </div>
                </div>
              </div>

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700'
                }`}
              >
                {isProcessing ? 'Applying EQ...' : 'Apply Equalization'}
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              
              {processedAudio ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Equalized Audio</h3>
                    <audio controls className="w-full mb-4">
                      <source src={processedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                      onClick={downloadAudio}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Equalized Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Equalized audio will appear here</p>
                </div>
              )}

              {/* EQ Presets */}
              <div className="bg-cyan-50 rounded-2xl p-6">
                <h3 className="font-semibold text-cyan-900 mb-4">Quick EQ Presets</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setLowGain(3); setMidGain(0); setHighGain(2) }}
                    className="p-3 bg-white rounded-lg text-sm font-medium text-cyan-800 hover:bg-cyan-100 transition-colors"
                  >
                    Pop Music
                  </button>
                  <button
                    onClick={() => { setLowGain(4); setMidGain(-2); setHighGain(3) }}
                    className="p-3 bg-white rounded-lg text-sm font-medium text-cyan-800 hover:bg-cyan-100 transition-colors"
                  >
                    Rock/Metal
                  </button>
                  <button
                    onClick={() => { setLowGain(1); setMidGain(3); setHighGain(1) }}
                    className="p-3 bg-white rounded-lg text-sm font-medium text-cyan-800 hover:bg-cyan-100 transition-colors"
                  >
                    Vocal Focus
                  </button>
                  <button
                    onClick={() => { setLowGain(-2); setMidGain(2); setHighGain(4) }}
                    className="p-3 bg-white rounded-lg text-sm font-medium text-cyan-800 hover:bg-cyan-100 transition-colors"
                  >
                    Clarity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}