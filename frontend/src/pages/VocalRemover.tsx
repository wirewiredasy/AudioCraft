import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, VolumeX, Download, Play, Pause, FileAudio, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function VocalRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const validTypes = ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/m4a', 'audio/aac', 'audio/ogg']
      if (!validTypes.some(type => selectedFile.type.includes(type.split('/')[1]))) {
        toast.error('Please select a valid audio file (MP3, WAV, FLAC, M4A, AAC, OGG)')
        return
      }

      // Validate file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error('File size should be less than 50MB')
        return
      }

      setFile(selectedFile)
      setProcessed(false)
      setProcessedUrl(null)
      toast.success('File uploaded successfully!')
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setProcessing(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch('http://localhost:5000/remove-vocals', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setProcessedUrl(result.results.instrumental.url)
          setProcessed(true)
          toast.success('Vocals removed successfully!')
        } else {
          throw new Error(result.message || 'Processing failed')
        }
      } else {
        throw new Error('Server error occurred')
      }
    } catch (error) {
      console.error('Processing error:', error)
      toast.error('Failed to process audio. Please try again.')
      setProcessed(false)
    } finally {
      setProcessing(false)
      setUploadProgress(0)
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownload = () => {
    if (processedUrl) {
      const link = document.createElement('a')
      link.href = processedUrl
      link.download = `${file?.name?.split('.')[0] || 'audio'}_instrumental.wav`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('Download started!')
    }
  }

  const resetUpload = () => {
    setFile(null)
    setProcessed(false)
    setProcessedUrl(null)
    setIsPlaying(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium mb-6">
            <VolumeX className="w-4 h-4 mr-2" />
            AI-Powered Vocal Removal
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ODOREMOVER
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Remove vocals from any song using advanced AI algorithms. Perfect for creating karaoke tracks or instrumental versions.
          </p>
        </motion.div>

        {/* Main Processing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {!file ? (
            /* Upload Section */
            <div className="text-center">
              <div 
                className="border-2 border-dashed border-white/20 rounded-xl p-12 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4 group-hover:text-red-400 transition-colors" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload Audio File</h3>
                <p className="text-gray-400 mb-6">
                  Drag & drop or click to upload<br/>
                  Supports MP3, WAV, FLAC, M4A, AAC, OGG (Max: 50MB)
                </p>
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Choose File
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mp3,audio/wav,audio/flac,audio/m4a,audio/aac,audio/ogg,.mp3,.wav,.flac,.m4a,.aac,.ogg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            /* Processing Section */
            <div className="space-y-6">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                    <FileAudio className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white truncate max-w-xs">{file.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetUpload}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  {processing ? (
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
              </div>

              {/* Processing Progress */}
              {processing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-300">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI is separating vocals from instrumentals...</span>
                  </div>
                </motion.div>
              )}

              {/* Success Result */}
              {processed && processedUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="p-6 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-400 mb-2">
                      Vocal Removal Completed!
                    </h3>
                    <p className="text-gray-300">
                      Your instrumental track is ready for download
                    </p>
                  </div>

                  {/* Audio Player */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={togglePlayback}
                        className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                      </button>
                      <span className="text-gray-300">Preview Instrumental</span>
                    </div>
                    <audio
                      ref={audioRef}
                      src={processedUrl}
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Download className="w-5 h-5 mr-2 inline" />
                    Download Instrumental
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <VolumeX className="w-8 h-8" />,
              title: "AI-Powered Separation",
              description: "Advanced machine learning algorithms for precise vocal isolation"
            },
            {
              icon: <FileAudio className="w-8 h-8" />,
              title: "Multiple Formats",
              description: "Support for MP3, WAV, FLAC, M4A, AAC, and OGG files"
            },
            {
              icon: <CheckCircle className="w-8 h-8" />,
              title: "High Quality Output",
              description: "Maintain audio quality while removing vocals effectively"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="text-red-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}