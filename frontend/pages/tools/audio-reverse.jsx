import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import { ArrowLeft, Upload, Download, RotateCcw, Rewind } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export default function AudioReverse() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        setProcessedAudio(null)
        toast.success('Audio file ready for reversing!')
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

    try {
      const response = await axios.post('http://localhost:8000/audio-reverse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      })

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setProcessedAudio(audioUrl)
      toast.success('Audio reversed successfully!')
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
      a.download = `${audioFile.name.replace(/\.[^/.]+$/, '')}_reversed.mp3`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <>
      <Head>
        <title>Audio Reverse - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Reverse audio playback completely for unique backwards effects" />
      </Head>

      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <ArrowLeft className="w-5 h-5" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold">Audio Reverse</span>
                </div>
              </Link>
              <div className="text-sm text-gray-500">ODOREMOVER Audio Suite</div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Audio Reverse</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Reverse audio playback completely to create unique backwards effects and special audio experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upload Audio</h2>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-violet-500 bg-violet-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                {audioFile ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">{audioFile.name}</p>
                    <p className="text-gray-500">Ready for reversing</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your audio file here</p>
                    <p className="text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              <div className="bg-violet-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-violet-900 mb-3">How Audio Reverse Works</h3>
                <div className="space-y-2 text-sm text-violet-700">
                  <p>• Reverses the entire audio waveform from end to beginning</p>
                  <p>• Creates unique backwards vocal and instrumental effects</p>
                  <p>• Perfect for creative projects and special sound design</p>
                  <p>• Maintains original audio quality and format</p>
                </div>
              </div>

              <button
                onClick={processAudio}
                disabled={!audioFile || isProcessing}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                  !audioFile || isProcessing
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-violet-600 text-white hover:bg-violet-700'
                }`}
              >
                {isProcessing ? 'Reversing Audio...' : 'Reverse Audio'}
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
              
              {processedAudio ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Reversed Audio</h3>
                    <audio controls className="w-full mb-4">
                      <source src={processedAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                      onClick={downloadAudio}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Reversed Audio</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                  <Rewind className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Reversed audio will appear here</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 bg-violet-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Creative Uses for Reversed Audio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Music Production</h4>
                <p>Create unique intro/outro effects, hidden messages, and atmospheric soundscapes for your tracks.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sound Design</h4>
                <p>Generate otherworldly effects for films, games, and multimedia projects with reversed audio elements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}