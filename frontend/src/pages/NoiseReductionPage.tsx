import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Shield, Upload, Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export default function NoiseReductionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [noiseReductionStrength, setNoiseReductionStrength] = useState(0.5)

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
    formData.append('noise_reduction_strength', noiseReductionStrength.toString())

    try {
      const response = await axios.post('/reduce-noise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setProcessedUrl(response.data.download_url)
        toast.success('Noise reduced successfully!')
      } else {
        toast.error('Failed to reduce noise')
      }
    } catch (error) {
      console.error('Error reducing noise:', error)
      toast.error('Error processing audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-600 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Noise Reduction
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Remove background noise and enhance audio clarity using advanced spectral subtraction
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
                isDragActive ? 'border-orange-500 bg-orange-500/10' : ''
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

          {/* Noise Reduction Controls */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="netflix-card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Noise Reduction Settings</h3>
              
              <div className="max-w-md mx-auto">
                <label className="block text-white font-semibold mb-4">
                  Reduction Strength
                </label>
                
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={noiseReductionStrength}
                    onChange={(e) => setNoiseReductionStrength(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Light</span>
                    <span className="text-orange-400 font-semibold">
                      {Math.round(noiseReductionStrength * 100)}%
                    </span>
                    <span>Heavy</span>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Strength Guide:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• <span className="text-green-400">10-30%</span>: Light background noise</li>
                      <li>• <span className="text-yellow-400">40-60%</span>: Moderate noise reduction</li>
                      <li>• <span className="text-orange-400">70-90%</span>: Heavy noise removal</li>
                      <li>• <span className="text-red-400">100%</span>: Maximum (may affect quality)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={processAudio}
                  disabled={isProcessing}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Reduce Noise
                    </>
                  )}
                </button>
              </div>
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
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-semibold">Processing your audio...</p>
                <p className="text-gray-400">Applying noise reduction algorithms</p>
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
                  Noise Reduced Successfully!
                </h3>
                <p className="text-gray-400 mb-6">
                  Applied {Math.round(noiseReductionStrength * 100)}% noise reduction
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