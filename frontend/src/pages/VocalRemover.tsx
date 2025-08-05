import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'sonner'
import { Upload, Download, Volume2, FileAudio, Loader2 } from 'lucide-react'

export default function VocalRemover() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      toast.success(`File "${file.name}" uploaded successfully`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    maxFiles: 1
  })

  const processAudio = async () => {
    if (!uploadedFile) {
      toast.error('Please upload an audio file first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', uploadedFile)

    try {
      const response = await axios.post('/remove-vocals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setProcessedFile(response.data.download_url)
        toast.success('Vocals removed successfully!')
      } else {
        toast.error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = () => {
    if (processedFile) {
      window.open(processedFile, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-vocal-remover rounded-3xl mb-8 shadow-xl">
              <Volume2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gradient-rainbow mb-6">
              Vocal Remover
            </h1>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Remove vocals from any audio track using AI-powered center channel extraction. 
              Perfect for creating karaoke tracks or instrumental versions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Upload Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Upload className="w-6 h-6" />
                Upload Audio File
              </h2>
              <p className="text-white/70 mb-6">
                Supports MP3, WAV, FLAC, M4A, AAC, and OGG formats
              </p>
              
              <div
                {...getRootProps()}
                className={`upload-zone ${isDragActive ? 'dragover' : ''}`}
              >
                <input {...getInputProps()} />
                <FileAudio className="w-12 h-12 text-white/50 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-white font-semibold">Drop the audio file here...</p>
                ) : (
                  <>
                    <p className="text-white font-semibold mb-2">
                      Drag & drop an audio file here, or click to select
                    </p>
                    <p className="text-white/60 text-sm">Maximum file size: 100MB</p>
                  </>
                )}
              </div>

              {uploadedFile && (
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-white font-medium">Selected: {uploadedFile.name}</p>
                  <p className="text-white/70 text-sm">
                    Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={processAudio}
                disabled={!uploadedFile || isProcessing}
                className={`w-full mt-6 btn-netflix flex items-center justify-center gap-3 py-4 text-lg font-bold ${
                  (!uploadedFile || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    Remove Vocals
                  </>
                )}
              </motion.button>
            </div>

            {/* Results Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <Download className="w-6 h-6" />
                Processed Audio
              </h2>
              <p className="text-white/70 mb-6">
                Download your vocal-removed audio file
              </p>

              {processedFile ? (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-disney/20 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-disney rounded-xl flex items-center justify-center">
                        <FileAudio className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Processing Complete!</p>
                        <p className="text-white/70 text-sm">Your instrumental track is ready</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadFile}
                      className="w-full btn-disney flex items-center justify-center gap-3 py-3 font-bold"
                    >
                      <Download className="w-5 h-5" />
                      Download Instrumental
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileAudio className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-white/60">
                    Upload and process an audio file to see results here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-netflix rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white font-black text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Upload</h3>
                <p className="text-white/70">
                  Upload your audio file in any supported format
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-disney rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white font-black text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Process</h3>
                <p className="text-white/70">
                  AI analyzes and removes vocals using center channel extraction
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-vocal-remover rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white font-black text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Download</h3>
                <p className="text-white/70">
                  Get your instrumental track ready for karaoke or remixing
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}