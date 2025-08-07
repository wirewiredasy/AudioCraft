import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import toast from 'react-hot-toast'
import Header from '../../components/Header'
import Upload from '../../components/Upload'
import Player from '../../components/Player'
import { Mic, Info } from 'lucide-react'

export default function VocalRemover() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/vocal-remover`,
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
      toast.success('Vocals removed successfully!')
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error(error.response?.data?.detail || 'Failed to remove vocals')
      setUploadProgress(0)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>Vocal Remover - ODOREMOVER Audio Suite</title>
        <meta name="description" content="Remove vocals from songs using AI-powered separation. Create instrumental tracks and karaoke versions." />
      </Head>

      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Vocal Remover
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Remove vocals from songs using advanced AI separation technology. 
              Create instrumental tracks or karaoke versions with professional quality.
            </p>
          </div>

          {/* Info Section */}
          <div className="alert-info mb-8">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">How It Works</h3>
                <div className="text-gray-300 space-y-1">
                  <p>• Uses center channel extraction and spectral subtraction</p>
                  <p>• Works best with stereo recordings where vocals are centered</p>
                  <p>• Results may vary based on original mixing and recording quality</p>
                  <p>• Supports all major audio formats (MP3, WAV, FLAC, etc.)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="glass-card mb-8">
            <Upload 
              onFileSelect={handleFileUpload}
              isProcessing={isProcessing}
              accept="audio/*"
              title="Upload Audio File"
              description="Select a song to remove vocals from"
            />

            {selectedFile && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">{selectedFile.name}</h3>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={processAudio}
                    disabled={isProcessing}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isProcessing ? 'Removing Vocals...' : 'Remove Vocals'}
                  </button>
                </div>

                {/* Progress */}
                {uploadProgress > 0 && (
                  <div className="mb-4">
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
                ✅ Vocals Removed Successfully!
              </h3>
              
              <Player
                audioUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.output_file}`}
                fileName={`vocal_removed_${selectedFile?.name || 'audio.wav'}`}
                downloadUrl={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${result.download_url}`}
              />

              {/* Processing Details */}
              {result.processing_details && (
                <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Processing Details</h4>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Duration: {result.processing_details.duration?.toFixed(2)} seconds</p>
                    <p>Sample Rate: {result.processing_details.sample_rate} Hz</p>
                    <p>Methods: {result.methods_used?.join(', ')}</p>
                    <p>Vocal Suppression: {result.processing_details.vocal_suppression}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  )
}