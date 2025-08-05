
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, VolumeX, Download, Play, Pause } from 'lucide-react'

export default function VocalRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleProcess = async () => {
    if (!file) return
    
    setProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setProcessing(false)
      setProcessed(true)
    }, 3000)
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Vocal Remover
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Remove vocals from any song using advanced AI algorithms. Perfect for creating karaoke tracks or instrumental versions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
        >
          {!file ? (
            <div className="text-center">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-12 hover:border-red-500/50 transition-colors">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload Audio File</h3>
                <p className="text-gray-400 mb-6">Support for MP3, WAV, FLAC, and more</p>
                <label className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg cursor-pointer transition-colors">
                  Choose File
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <VolumeX className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{file.name}</h3>
                  <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                >
                  {processing ? 'Processing...' : 'Remove Vocals'}
                </button>
              </div>

              {processing && (
                <div className="text-center">
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-gray-400">AI is separating vocals from instrumentals...</p>
                </div>
              )}

              {processed && (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 font-semibold">Vocal removal completed!</p>
                  </div>
                  <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    Download Instrumental
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
