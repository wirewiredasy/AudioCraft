import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, Scissors, Clock, Play, Pause } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function CutterJoiner() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [operation, setOperation] = useState('cut')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(10)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for editing!')
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

    if (operation === 'cut' && startTime >= endTime) {
      toast.error('End time must be greater than start time')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('operation', operation)
    formData.append('start_time', startTime.toString())
    formData.append('end_time', endTime.toString())

    try {
      const response = await axios.post('/api/cutter-joiner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success(`Audio ${operation} completed!`)
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
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_${operation}.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <>
      <Head>
        <title>Audio Cutter & Joiner - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Cut audio files at precise timestamps or join multiple files seamlessly" />
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
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Audio Cutter & Joiner</span>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Audio Cutter & Joiner</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cut audio files at precise timestamps or join multiple files seamlessly with professional editing tools
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
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for editing</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your audio file here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              {/* Operation Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operation
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setOperation('cut')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      operation === 'cut'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cut Audio
                  </button>
                  <button
                    onClick={() => setOperation('join')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      operation === 'join'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Join Audio
                  </button>
                </div>
              </div>

              {/* Time Controls */}
              {operation === 'cut' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time (seconds): {startTime}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      step="0.5"
                      value={startTime}
                      onChange={(e) => setStartTime(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time (seconds): {endTime}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="300"
                      step="0.5"
                      value={endTime}
                      onChange={(e) => setEndTime(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <Clock className="w-4 h-4" />
                      <span>
                        Duration: {(endTime - startTime).toFixed(1)} seconds
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {isProcessing ? `${operation === 'cut' ? 'Cutting' : 'Joining'} Audio...` : `${operation === 'cut' ? 'Cut' : 'Join'} Audio`}
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
                      <span>Download Edited Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <Scissors className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Edited audio will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-orange-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Audio Editing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Precise Cutting</h4>
                <p>Cut audio at exact timestamps with sample-level precision. Perfect for creating clips and removing unwanted sections.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Seamless Joining</h4>
                <p>Join multiple audio files with smooth transitions. Automatic level matching for professional results.</p>
              </div>
            </div>
          </div>
          
          {/* Recommended Tools */}
          <div className="mt-8">
            <RecommendedTools currentTool="cutter-joiner" maxTools={4} />
          </div>
        </div>
      </div>
    </>
  )
}