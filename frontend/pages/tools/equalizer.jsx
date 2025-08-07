import React, { useState } from 'react'
import { Upload, Download, BarChart3, Sliders } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ToolPageLayout } from '../../components/ToolPageLayout'
import { EqualizerIcon } from '../../components/CustomIcons'
import { EnhancedUpload } from '../../components/EnhancedUpload'
import { RecommendedTools } from '../../components/RecommendedTools'

export default function Equalizer() {
  const [eqSettings, setEqSettings] = useState({
    bass: 0,
    mid: 0,
    treble: 0,
    lowMid: 0,
    highMid: 0
  })
  const [processedAudio, setProcessedAudio] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileUpload = async (file, options = {}) => {
    try {
      options.onStageChange?.('Uploading file...')
      
      const formData = new FormData()
      formData.append('file', file)
      Object.keys(eqSettings).forEach(key => {
        formData.append(key, eqSettings[key].toString())
      })
      
      const response = await axios.post('/api/equalizer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 50) / progressEvent.total)
          options.onProgress?.(progress)
        }
      })
      
      options.onStageChange?.('Applying equalizer...')
      options.onProgress?.(75)
      
      if (response.data.success) {
        setDownloadUrl(response.data.download_url)
        setProcessedAudio(response.data)
        options.onProgress?.(100)
        options.onStageChange?.('Complete!')
        toast.success('Equalizer applied successfully!')
      } else {
        throw new Error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || error.message || 'Failed to apply equalizer')
      throw error
    }
  }

  const handleEQChange = (band, value) => {
    setEqSettings(prev => ({
      ...prev,
      [band]: parseInt(value)
    }))
  }

  const resetEQ = () => {
    setEqSettings({
      bass: 0,
      mid: 0,
      treble: 0,
      lowMid: 0,
      highMid: 0
    })
  }

  const downloadProcessedAudio = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  const eqBands = [
    { key: 'bass', label: 'Bass', freq: '60Hz', color: 'text-red-400' },
    { key: 'lowMid', label: 'Low Mid', freq: '250Hz', color: 'text-orange-400' },
    { key: 'mid', label: 'Mid', freq: '1kHz', color: 'text-yellow-400' },
    { key: 'highMid', label: 'High Mid', freq: '4kHz', color: 'text-green-400' },
    { key: 'treble', label: 'Treble', freq: '10kHz', color: 'text-blue-400' }
  ]

  return (
    <ToolPageLayout
      title="Audio Equalizer"
      description="Fine-tune your audio frequencies with professional 5-band EQ"
      icon={EqualizerIcon}
      iconColor="text-teal-400"
    >
      <div className="max-w-4xl mx-auto">
        {/* EQ Controls */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-teal-400" />
              5-Band Equalizer
            </h2>
            <button
              onClick={resetEQ}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {eqBands.map((band) => (
              <div key={band.key} className="text-center">
                <label className={`block text-sm font-medium ${band.color} mb-2`}>
                  {band.label}
                </label>
                <div className="relative h-40 bg-gray-800 rounded-lg p-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={eqSettings[band.key]}
                    onChange={(e) => handleEQChange(band.key, e.target.value)}
                    className="slider-vertical w-full h-full"
                    orient="vertical"
                  />
                </div>
                <div className="mt-2">
                  <div className={`text-lg font-bold ${band.color}`}>
                    {eqSettings[band.key] > 0 ? '+' : ''}{eqSettings[band.key]}dB
                  </div>
                  <div className="text-xs text-gray-500">{band.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-teal-400" />
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
              Equalizer Applied
            </h3>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{processedAudio.filename}</p>
                  <div className="text-gray-400 text-sm mt-1">
                    EQ: Bass {eqSettings.bass > 0 ? '+' : ''}{eqSettings.bass}dB • 
                    Mid {eqSettings.mid > 0 ? '+' : ''}{eqSettings.mid}dB • 
                    Treble {eqSettings.treble > 0 ? '+' : ''}{eqSettings.treble}dB
                  </div>
                </div>
                
                <button
                  onClick={downloadProcessedAudio}
                  disabled={!downloadUrl}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 
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

        {/* Recommended Tools */}
        <RecommendedTools currentTool="equalizer" maxTools={4} />
      </div>
      
      <Toaster position="top-right" />
    </ToolPageLayout>
  )
}