import React, { useState } from 'react'
import { Upload, Download, Volume2, BarChart3 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ToolPageLayout } from '../../components/ToolPageLayout'
import { VolumeNormalizerIcon } from '../../components/CustomIcons'
import { EnhancedUpload } from '../../components/EnhancedUpload'

export default function VolumeNormalizer() {
  const [targetLevel, setTargetLevel] = useState(-6.0)
  const [normalize, setNormalize] = useState(true)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileUpload = async (file, options = {}) => {
    try {
      options.onStageChange?.('Uploading file...')
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('target_level', targetLevel.toString())
      formData.append('normalize', normalize.toString())
      
      const response = await axios.post('/api/volume-normalizer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 50) / progressEvent.total)
          options.onProgress?.(progress)
        }
      })
      
      options.onStageChange?.('Normalizing volume...')
      options.onProgress?.(75)
      
      if (response.data.success) {
        setDownloadUrl(response.data.download_url)
        setProcessedAudio(response.data)
        options.onProgress?.(100)
        options.onStageChange?.('Complete!')
        toast.success('Volume normalized successfully!')
      } else {
        throw new Error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || error.message || 'Failed to normalize volume')
      throw error
    }
  }

  const downloadProcessedAudio = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <ToolPageLayout
      title="Volume Normalizer"
      description="Normalize audio volume levels for consistent playback"
      icon={VolumeNormalizerIcon}
      iconColor="text-orange-400"
    >
      <div className="max-w-4xl mx-auto">
        {/* Settings */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-orange-400" />
            Normalization Settings
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Target Level (dB): {targetLevel}
              </label>
              <input
                type="range"
                min="-20"
                max="0"
                step="0.5"
                value={targetLevel}
                onChange={(e) => setTargetLevel(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>-20dB</span>
                <span>-10dB</span>
                <span>0dB</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="normalize"
                checked={normalize}
                onChange={(e) => setNormalize(e.target.checked)}
                className="w-5 h-5 text-orange-500 bg-gray-700 border-gray-600 rounded 
                         focus:ring-orange-500 focus:ring-2"
              />
              <label htmlFor="normalize" className="text-gray-300 font-medium">
                Apply RMS normalization
              </label>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-orange-400" />
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
              <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
              Volume Normalized
            </h3>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{processedAudio.filename}</p>
                  <p className="text-gray-400 text-sm">
                    Target Level: {targetLevel}dB{normalize ? ' • RMS Normalized' : ''}
                  </p>
                </div>
                
                <button
                  onClick={downloadProcessedAudio}
                  disabled={!downloadUrl}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 
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
      </div>
      
      <Toaster position="top-right" />
    </ToolPageLayout>
  )
}