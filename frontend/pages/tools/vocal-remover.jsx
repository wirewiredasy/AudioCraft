import { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import Player from '../../components/Player'
import { Mic, Download, Loader2, CheckCircle } from 'lucide-react'

export default function VocalRemover() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setProcessedFile(null)
    setProgress(0)
  }

  const handleProcess = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/vocal-remover/process', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Processing failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      setProcessedFile({
        url,
        name: `${file.name.split('.')[0]}_no_vocals.${file.name.split('.').pop()}`,
        size: blob.size
      })

      setProgress(100)
      clearInterval(progressInterval)
    } catch (error) {
      console.error('Error processing file:', error)
      alert('Error processing file. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedFile) {
      const a = document.createElement('a')
      a.href = processedFile.url
      a.download = processedFile.name
      a.click()
    }
  }

  return (
    <>
      <Head>
        <title>Vocal Remover - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Remove vocals from any song to create instrumental tracks and karaoke versions using AI-powered vocal separation technology." />
      </Head>

      <div className="min-h-screen">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tool Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vocal Remover
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Remove vocals from any song to create instrumental tracks perfect for karaoke, 
              backing tracks, or remixing projects.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <Upload
              onFileSelect={handleFileSelect}
              acceptedFormats={['.mp3', '.wav', '.flac', '.m4a', '.aac']}
              maxSize={50}
              title="Upload Audio File"
              description="Supported formats: MP3, WAV, FLAC, M4A, AAC (Max 50MB)"
            />
          </div>

          {/* File Info */}
          {file && (
            <div className="glass-card mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Selected File</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" />
                      <span>Remove Vocals</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Progress */}
          {isProcessing && (
            <div className="glass-card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Processing Audio</h3>
                <span className="text-white font-medium">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Analyzing audio patterns and separating vocal frequencies...
              </p>
            </div>
          )}

          {/* Results */}
          {processedFile && (
            <div className="glass-card mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Processing Complete</h3>
              </div>

              {/* Audio Players */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Original Audio</h4>
                  <Player
                    src={URL.createObjectURL(file)}
                    title="Original"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Vocals Removed</h4>
                  <Player
                    src={processedFile.url}
                    title="No Vocals"
                  />
                </div>
              </div>

              {/* Download Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleDownload}
                  className="btn-success flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Instrumental</span>
                </button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="glass-card">
            <h3 className="text-xl font-semibold text-white mb-6">How Vocal Removal Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 font-bold">1</span>
                </div>
                <h4 className="text-white font-medium mb-2">Audio Analysis</h4>
                <p className="text-gray-400 text-sm">
                  Our AI analyzes the stereo field to identify vocal frequencies and spatial positioning.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 font-bold">2</span>
                </div>
                <h4 className="text-white font-medium mb-2">Vocal Separation</h4>
                <p className="text-gray-400 text-sm">
                  Advanced spectral subtraction removes center-panned vocals while preserving instruments.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 font-bold">3</span>
                </div>
                <h4 className="text-white font-medium mb-2">Quality Enhancement</h4>
                <p className="text-gray-400 text-sm">
                  The remaining instrumental track is optimized for clarity and balanced frequency response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}