import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import Player from '../../components/Player'
import { RefreshCw } from 'lucide-react'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function Converter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [outputFormat, setOutputFormat] = useState('mp3')
  const [quality, setQuality] = useState('high')

  const formats = [
    { value: 'mp3', label: 'MP3', description: 'Most compatible, smaller file size' },
    { value: 'wav', label: 'WAV', description: 'Uncompressed, highest quality' },
    { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
    { value: 'aac', label: 'AAC', description: 'Good quality, Apple compatible' },
    { value: 'ogg', label: 'OGG', description: 'Open source, good compression' }
  ]

  const qualities = [
    { value: 'high', label: 'High (320kbps)', description: 'Best quality' },
    { value: 'medium', label: 'Medium (192kbps)', description: 'Good balance' },
    { value: 'low', label: 'Low (128kbps)', description: 'Smaller file size' }
  ]

  const handleFileUpload = (file) => {
    setSelectedFile(file)
    setResult(null)
    setUploadProgress(0)
  }

  const processAudio = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('output_format', outputFormat)
      formData.append('quality', quality)

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/converter`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          },
        }
      )

      setResult(response.data)
      setUploadProgress(100)
      toast.success(`Converted to ${outputFormat.toUpperCase()} successfully!`)
    } catch (error) {
      console.error('Error converting audio:', error)
      toast.error(error.response?.data?.detail || 'Failed to convert audio')
      setUploadProgress(0)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Audio Converter - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Convert audio files between different formats with quality options. Support for MP3, WAV, FLAC, AAC, and more." />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Audio Converter
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Convert audio files between different formats with customizable quality settings. 
              Support for all major audio formats including MP3, WAV, FLAC, AAC, and more.
            </p>
          </div>

          {/* Upload Section */}
          <div className="glass-card mb-8">
            <Upload 
              onFileSelect={handleFileUpload}
              isProcessing={isProcessing}
              accept="audio/*"
              title="Upload Audio File"
              description="Select an audio file to convert"
            />

            {selectedFile && (
              <div className="mt-8 space-y-6">
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Output Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {formats.map((format) => (
                      <button
                        key={format.value}
                        onClick={() => setOutputFormat(format.value)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          outputFormat === format.value
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium text-white">{format.label}</div>
                        <div className="text-sm text-gray-400 mt-1">{format.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Selection (for lossy formats) */}
                {['mp3', 'aac', 'ogg'].includes(outputFormat) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Quality Settings
                    </label>
                    <div className="space-y-2">
                      {qualities.map((qual) => (
                        <button
                          key={qual.value}
                          onClick={() => setQuality(qual.value)}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            quality === qual.value
                              ? 'border-primary-500 bg-primary-500/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-white">{qual.label}</div>
                              <div className="text-sm text-gray-400">{qual.description}</div>
                            </div>
                            {quality === qual.value && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400">
                      Convert to {outputFormat.toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={processAudio}
                    disabled={isProcessing}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isProcessing ? 'Converting...' : 'Convert Audio'}
                  </button>
                </div>

                {/* Progress */}
                {uploadProgress > 0 && (
                  <div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="glass-card">
              <h3 className="text-xl font-semibold text-white mb-6">
                ✅ Audio Converted Successfully!
              </h3>
              
              <Player
                audioUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.output_file}`}
                fileName={`converted_${selectedFile?.name || 'audio'}.${outputFormat}`}
                downloadUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.download_url}`}
              />

              {/* Conversion Details */}
              {result.conversion_details && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Conversion Details</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Output Format: {result.conversion_details.output_format?.toUpperCase()}</p>
                    <p>Quality: {result.conversion_details.quality}</p>
                    <p>Duration: {(result.conversion_details.duration_ms / 1000)?.toFixed(2)} seconds</p>
                    <p>Channels: {result.conversion_details.channels}</p>
                    <p>Sample Rate: {result.conversion_details.sample_rate} Hz</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Recommended Tools */}
          <div className="mt-8">
            <RecommendedTools currentTool="converter" maxTools={4} />
          </div>
        </main>
      </div>
    </>
  )
}