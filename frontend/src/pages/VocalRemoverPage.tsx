import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { VolumeX, Upload, Download, Loader2, Play, Pause } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export default function VocalRemoverPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setProcessedUrl(null)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    maxFiles: 1
  })

  const processAudio = async () => {
    if (!file) {
      toast.error('Please select an audio file first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/remove-vocals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setProcessedUrl(response.data.download_url)
        toast.success('Vocals removed successfully!')
      } else {
        toast.error('Failed to process audio')
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Error processing audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-600 mb-6">
            <VolumeX className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Vocal Remover
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Remove vocals from any song using AI-powered audio separation technology
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="netflix-card p-8"
          >
            <div
              {...getRootProps()}
              className={`upload-area rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive ? 'border-red-500 bg-red-500/10' : ''
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              {file ? (
                <div>
                  <p className="text-white font-semibold text-lg mb-2">
                    {file.name}
                  </p>
                  <p className="text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-semibold text-lg mb-2">
                    Drop your audio file here, or click to browse
                  </p>
                  <p className="text-gray-400">
                    Supports MP3, WAV, FLAC, M4A, AAC, OGG
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Process Button */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <button
                onClick={processAudio}
                disabled={isProcessing}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <VolumeX className="w-5 h-5 mr-2" />
                    Remove Vocals
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Processing Animation */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="netflix-card p-8 text-center"
            >
              <div className="processing-animation">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-semibold">Processing your audio...</p>
                <p className="text-gray-400">This may take a few moments</p>
              </div>
            </motion.div>
          )}

          {/* Download Result */}
          {processedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="netflix-card p-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Vocals Removed Successfully!
                </h3>
                <p className="text-gray-400 mb-6">
                  Your processed audio is ready for download
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <audio controls className="w-full max-w-md">
                    <source src={processedUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  <a
                    href={processedUrl}
                    download
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}