import React, { useState } from 'react'
import { Upload, Download, RotateCcw, Rewind, Play, Pause, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ToolPageLayout } from '../../components/ToolPageLayout'
import { AudioReverseIcon } from '../../components/CustomIcons'
import { EnhancedUpload } from '../../components/EnhancedUpload'

export default function AudioReverse() {
  const [audioFile, setAudioFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileUpload = async (file, options = {}) => {
    try {
      setIsProcessing(true)
      options.onStageChange?.('Uploading file...')
      
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await axios.post('/api/audio-reverse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 50) / progressEvent.total)
          options.onProgress?.(progress)
        }
      })
      
      options.onStageChange?.('Processing audio...')
      options.onProgress?.(75)
      
      if (response.data.success) {
        setDownloadUrl(response.data.download_url)
        setProcessedAudio(response.data)
        options.onProgress?.(100)
        options.onStageChange?.('Complete!')
        toast.success('Audio successfully reversed!')
      } else {
        throw new Error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || error.message || 'Failed to reverse audio')
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadProcessedAudio = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <ToolPageLayout
      title="Audio Reverse"
      description="Reverse your audio files instantly with AI-powered processing"
      icon={AudioReverseIcon}
      iconColor="text-violet-400"
    >
      <div className="max-w-4xl mx-auto">
        {/* Upload Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-violet-400" />
            Upload Audio File
          </h2>
          
          <EnhancedUpload
            onFileUpload={handleFileUpload}
            maxFiles={1}
            acceptedFormats={['audio/*']}
            showPreview={true}
          />
        </div>

        {/* Results Section */}
        {processedAudio && (
          <div className="glass-card p-8 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <RotateCcw className="w-5 h-5 mr-2 text-green-400" />
              Reversed Audio Ready
            </h3>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{processedAudio.filename}</p>
                  <p className="text-gray-400 text-sm">Processing completed successfully</p>
                </div>
                
                <button
                  onClick={downloadProcessedAudio}
                  disabled={!downloadUrl}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 
                           px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 
                           hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold text-white mb-6">How Audio Reverse Works</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Rewind className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Reverse Playback</h4>
                <p className="text-gray-400 text-sm">
                  Completely reverses the audio timeline, playing your file backwards from end to start.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Quality Preservation</h4>
                <p className="text-gray-400 text-sm">
                  Maintains original audio quality while creating the reversed effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Toaster position="top-right" />
    </ToolPageLayout>
  )
}