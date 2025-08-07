import React, { useState } from 'react'
import { Upload, Download, Volume2, VolumeX } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ToolPageLayout } from '../../components/ToolPageLayout'
import { FadeEffectIcon } from '../../components/CustomIcons'
import { EnhancedUpload } from '../../components/EnhancedUpload'

export default function FadeEffect() {
  const [fadeInDuration, setFadeInDuration] = useState(2)
  const [fadeOutDuration, setFadeOutDuration] = useState(2)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileUpload = async (file, options = {}) => {
    try {
      options.onStageChange?.('Uploading file...')
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fade_in_duration', fadeInDuration.toString())
      formData.append('fade_out_duration', fadeOutDuration.toString())
      
      const response = await axios.post('/api/fade-effect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 50) / progressEvent.total)
          options.onProgress?.(progress)
        }
      })
      
      options.onStageChange?.('Applying fade effects...')
      options.onProgress?.(75)
      
      if (response.data.success) {
        setDownloadUrl(response.data.download_url)
        setProcessedAudio(response.data)
        options.onProgress?.(100)
        options.onStageChange?.('Complete!')
        toast.success('Fade effects applied successfully!')
      } else {
        throw new Error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || error.message || 'Failed to apply fade effects')
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
      title="Fade Effect"
      description="Add professional fade in and fade out effects to your audio"
      icon={FadeEffectIcon}
      iconColor="text-amber-400"
    >
      <div className="max-w-4xl mx-auto">
        {/* Settings */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-amber-400" />
            Fade Settings
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Fade In Duration (seconds)
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={fadeInDuration}
                onChange={(e) => setFadeInDuration(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-amber-400 font-medium mt-2">
                {fadeInDuration}s
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Fade Out Duration (seconds)
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={fadeOutDuration}
                onChange={(e) => setFadeOutDuration(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-amber-400 font-medium mt-2">
                {fadeOutDuration}s
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-amber-400" />
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
              <VolumeX className="w-5 h-5 mr-2 text-green-400" />
              Fade Effects Applied
            </h3>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{processedAudio.filename}</p>
                  <p className="text-gray-400 text-sm">
                    Fade In: {fadeInDuration}s • Fade Out: {fadeOutDuration}s
                  </p>
                </div>
                
                <button
                  onClick={downloadProcessedAudio}
                  disabled={!downloadUrl}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 
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