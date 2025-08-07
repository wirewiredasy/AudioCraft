import React, { useState } from 'react'
import { Upload, Download, Edit3, Tag, Music } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ToolPageLayout } from '../../components/ToolPageLayout'
import { MetadataEditorIcon } from '../../components/CustomIcons'
import { EnhancedUpload } from '../../components/EnhancedUpload'

export default function MetadataEditor() {
  const [metadata, setMetadata] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
    comment: ''
  })
  const [processedAudio, setProcessedAudio] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileUpload = async (file, options = {}) => {
    try {
      options.onStageChange?.('Uploading file...')
      
      const formData = new FormData()
      formData.append('file', file)
      Object.keys(metadata).forEach(key => {
        if (metadata[key]) {
          formData.append(key, metadata[key])
        }
      })
      
      const response = await axios.post('/api/metadata-editor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 50) / progressEvent.total)
          options.onProgress?.(progress)
        }
      })
      
      options.onStageChange?.('Updating metadata...')
      options.onProgress?.(75)
      
      if (response.data.success) {
        setDownloadUrl(response.data.download_url)
        setProcessedAudio(response.data)
        options.onProgress?.(100)
        options.onStageChange?.('Complete!')
        toast.success('Metadata updated successfully!')
      } else {
        throw new Error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.detail || error.message || 'Failed to update metadata')
      throw error
    }
  }

  const handleMetadataChange = (field, value) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const downloadProcessedAudio = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <ToolPageLayout
      title="Metadata Editor"
      description="Edit audio file metadata including title, artist, album, and more"
      icon={MetadataEditorIcon}
      iconColor="text-emerald-400"
    >
      <div className="max-w-4xl mx-auto">
        {/* Metadata Form */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Edit3 className="w-5 h-5 mr-2 text-emerald-400" />
            Audio Metadata
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => handleMetadataChange('title', e.target.value)}
                placeholder="Song title"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Artist</label>
              <input
                type="text"
                value={metadata.artist}
                onChange={(e) => handleMetadataChange('artist', e.target.value)}
                placeholder="Artist name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Album</label>
              <input
                type="text"
                value={metadata.album}
                onChange={(e) => handleMetadataChange('album', e.target.value)}
                placeholder="Album name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <input
                type="text"
                value={metadata.year}
                onChange={(e) => handleMetadataChange('year', e.target.value)}
                placeholder="Release year"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <input
                type="text"
                value={metadata.genre}
                onChange={(e) => handleMetadataChange('genre', e.target.value)}
                placeholder="Music genre"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Comment</label>
              <input
                type="text"
                value={metadata.comment}
                onChange={(e) => handleMetadataChange('comment', e.target.value)}
                placeholder="Additional info"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-emerald-400" />
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
              <Tag className="w-5 h-5 mr-2 text-green-400" />
              Metadata Updated
            </h3>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{processedAudio.filename}</p>
                  <p className="text-gray-400 text-sm">
                    Metadata successfully updated
                  </p>
                </div>
                
                <button
                  onClick={downloadProcessedAudio}
                  disabled={!downloadUrl}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 
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