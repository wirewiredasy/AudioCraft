import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Edit3, Upload, Download, Loader2, Scissors, Link2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export default function EditorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [joinFile, setJoinFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [operation, setOperation] = useState<'cut' | 'join'>('cut')
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(30)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      if (operation === 'join' && !file) {
        setFile(acceptedFiles[0])
      } else if (operation === 'join' && file && !joinFile) {
        setJoinFile(acceptedFiles[0])
      } else {
        setFile(acceptedFiles[0])
        setJoinFile(null)
      }
      setProcessedUrl(null)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    maxFiles: operation === 'join' ? 2 : 1
  })

  const processAudio = async () => {
    if (!file) {
      toast.error('Please select an audio file first')
      return
    }

    if (operation === 'join' && !joinFile) {
      toast.error('Please select a second file to join')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('operation', operation)
    
    if (operation === 'cut') {
      formData.append('start_time', startTime.toString())
      formData.append('end_time', endTime.toString())
    } else if (operation === 'join' && joinFile) {
      formData.append('join_file', joinFile)
    }

    try {
      const response = await axios.post('/cut-join-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        setProcessedUrl(response.data.download_url)
        toast.success('Audio edited successfully!')
      } else {
        toast.error('Failed to edit audio')
      }
    } catch (error) {
      console.error('Error editing audio:', error)
      toast.error('Error editing audio file')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 mb-6">
            <Edit3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Audio Editor
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cut and join audio files with precision timing controls
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Operation Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="netflix-card p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Choose Operation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setOperation('cut')
                  setJoinFile(null)
                  setProcessedUrl(null)
                }}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  operation === 'cut'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10'
                }`}
              >
                <Scissors className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg mb-2">Cut Audio</div>
                <div className="text-gray-400 text-sm">
                  Extract a specific segment from your audio file
                </div>
              </button>

              <button
                onClick={() => {
                  setOperation('join')
                  setProcessedUrl(null)
                }}
                className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                  operation === 'join'
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/10'
                }`}
              >
                <Link2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg mb-2">Join Audio</div>
                <div className="text-gray-400 text-sm">
                  Combine two audio files into one
                </div>
              </button>
            </div>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="netflix-card p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {operation === 'join' ? 'Upload Audio Files' : 'Upload Audio File'}
            </h3>
            
            <div
              {...getRootProps()}
              className={`upload-area rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive ? 'border-purple-500 bg-purple-500/10' : ''
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              
              {operation === 'cut' ? (
                file ? (
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
                )
              ) : (
                <div>
                  <p className="text-white font-semibold text-lg mb-2">
                    Drop audio files here, or click to browse
                  </p>
                  {file && (
                    <div className="mt-4 space-y-2">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-white font-medium">File 1: {file.name}</p>
                      </div>
                      {joinFile && (
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <p className="text-white font-medium">File 2: {joinFile.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-gray-400 mt-2">
                    {operation === 'join' && !file ? 'Upload first file' :
                     operation === 'join' && file && !joinFile ? 'Upload second file' :
                     'Supports MP3, WAV, FLAC, M4A, AAC, OGG'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cut Controls */}
          {operation === 'cut' && file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="netflix-card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Cut Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Start Time (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={startTime}
                    onChange={(e) => setStartTime(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-3">
                    End Time (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={endTime}
                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Process Button */}
          {((operation === 'cut' && file) || (operation === 'join' && file && joinFile)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={processAudio}
                disabled={isProcessing}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {operation === 'cut' ? <Scissors className="w-5 h-5 mr-2" /> : <Link2 className="w-5 h-5 mr-2" />}
                    {operation === 'cut' ? 'Cut Audio' : 'Join Audio Files'}
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
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-semibold">Processing your audio...</p>
                <p className="text-gray-400">
                  {operation === 'cut' ? 'Cutting audio segment' : 'Joining audio files'}
                </p>
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
                  Audio {operation === 'cut' ? 'Cut' : 'Joined'} Successfully!
                </h3>
                <p className="text-gray-400 mb-6">
                  {operation === 'cut' 
                    ? `Extracted segment from ${startTime}s to ${endTime}s`
                    : 'Two audio files have been combined'
                  }
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