import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Settings, Upload, Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export default function ConverterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [targetFormat, setTargetFormat] = useState('mp3')

  const formats = [
    { value: 'mp3', label: 'MP3', description: 'Most compatible format' },
    { value: 'wav', label: 'WAV', description: 'Uncompressed, highest quality' },
    { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
    { value: 'm4a', label: 'M4A', description: 'Apple format, good quality' },
    { value: 'aac', label: 'AAC', description: 'Advanced Audio Coding' },
    { value: 'ogg', label: 'OGG', description: 'Open source format' }
  ]

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
    formData.append('target_format', targetFormat)

    try {
      const response = await axios.post('/convert-format', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setProcessedUrl(response.data.download_url)
        toast.success('Audio converted successfully!')
      } else {
        toast.error('Failed to convert audio')
      }
    } catch (error) {
      console.error('Error converting audio:', error)
      toast.error('Error converting audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-6">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Format Converter
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Convert between all major audio formats with high quality preservation
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
                isDragActive ? 'border-green-500 bg-green-500/10' : ''
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

          {/* Format Selection */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="netflix-card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Choose Output Format</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setTargetFormat(format.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      targetFormat === format.value
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-gray-600 hover:border-green-500/50 hover:bg-green-500/10'
                    }`}
                  >
                    <div className="font-semibold text-white text-lg mb-1">
                      {format.label}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {format.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={processAudio}
                  disabled={isProcessing}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Settings className="w-5 h-5 mr-2" />
                      Convert to {targetFormat.toUpperCase()}
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
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-semibold">Converting your audio...</p>
                <p className="text-gray-400">Converting to {targetFormat.toUpperCase()} format</p>
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
                  Conversion Complete!
                </h3>
                <p className="text-gray-400 mb-6">
                  Your audio has been converted to {targetFormat.toUpperCase()} format
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <audio controls className="w-full max-w-md">
                    <source src={processedUrl} type={`audio/${targetFormat}`} />
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