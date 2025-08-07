import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  X, 
  FileAudio, 
  AlertCircle,
  CheckCircle,
  Settings,
  Play
} from 'lucide-react'
import { AudioVisualizer } from './AudioVisualizer'

export const BatchUploader = ({ 
  toolType,
  onUploadComplete,
  maxFiles = 10,
  acceptedFormats = ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.wma']
}) => {
  const [files, setFiles] = useState([])
  const [settings, setSettings] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewFile, setPreviewFile] = useState(null)

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    // Handle accepted files
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'ready',
      preview: URL.createObjectURL(file)
    }))
    
    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles))
    
    // Handle rejected files
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach(error => {
          console.warn(`File ${file.name}: ${error.message}`)
        })
      })
    }
  }, [maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': acceptedFormats
    },
    maxFiles: maxFiles - files.length,
    disabled: isUploading
  })

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId)
      // Revoke object URL to prevent memory leaks
      const fileToRemove = prev.find(f => f.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return updatedFiles
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      
      // Add files
      files.forEach(({ file }) => {
        formData.append('files', file)
      })
      
      // Add settings
      formData.append('request', JSON.stringify({
        tool_type: toolType,
        settings: settings,
        priority: 5
      }))

      const response = await fetch('/api/processing/batch/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      
      // Update file statuses
      setFiles(prev => prev.map(file => ({
        ...file,
        status: 'uploaded'
      })))

      if (onUploadComplete) {
        onUploadComplete(result)
      }

    } catch (error) {
      console.error('Upload failed:', error)
      setFiles(prev => prev.map(file => ({
        ...file,
        status: 'error'
      })))
    } finally {
      setIsUploading(false)
      setUploadProgress(100)
    }
  }

  const getDefaultSettings = (toolType) => {
    switch (toolType) {
      case 'vocal_remover':
        return {
          method: 'center_channel_extraction',
          sensitivity: 0.8,
          preserve_stereo: true
        }
      case 'pitch_tempo':
        return {
          pitch_shift: 0,
          tempo_change: 1.0,
          preserve_quality: true
        }
      case 'noise_reduction':
        return {
          reduction_strength: 0.8,
          stationary: true,
          preserve_transients: true
        }
      case 'equalizer':
        return {
          bands: {
            '60Hz': 0, '170Hz': 0, '310Hz': 0, '600Hz': 0, '1kHz': 0,
            '3kHz': 0, '6kHz': 0, '12kHz': 0, '14kHz': 0, '16kHz': 0
          }
        }
      default:
        return {}
    }
  }

  React.useEffect(() => {
    setSettings(getDefaultSettings(toolType))
  }, [toolType])

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
          ${isDragActive 
            ? 'border-blue-400 bg-blue-400/10 scale-105' 
            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop files here' : 'Upload Audio Files'}
            </h3>
            <p className="text-gray-400">
              Drag & drop up to {maxFiles} audio files, or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: {acceptedFormats.join(', ')}
            </p>
          </div>
        </div>
        
        {isUploading && (
          <div className="absolute inset-0 bg-gray-900/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">Uploading...</p>
              <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FileAudio className="w-5 h-5 mr-2" />
            Selected Files ({files.length})
          </h3>
          
          <div className="space-y-3">
            {files.map((fileObj) => {
              const statusIcons = {
                ready: <AlertCircle className="w-4 h-4 text-yellow-400" />,
                uploaded: <CheckCircle className="w-4 h-4 text-green-400" />,
                error: <X className="w-4 h-4 text-red-400" />
              }
              
              return (
                <div
                  key={fileObj.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FileAudio className="w-5 h-5 text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {fileObj.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {formatFileSize(fileObj.size)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {statusIcons[fileObj.status]}
                      
                      <button
                        onClick={() => setPreviewFile(fileObj)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Preview Audio"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        disabled={isUploading}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove File"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Audio Preview */}
      {previewFile && (
        <div className="border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Audio Preview</h4>
            <button
              onClick={() => setPreviewFile(null)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <AudioVisualizer
            audioFile={previewFile.preview}
            className="h-32"
          />
        </div>
      )}

      {/* Settings Panel */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Processing Settings
        </h3>
        
        {/* Tool-specific settings would go here */}
        <div className="text-sm text-gray-400">
          Settings for {toolType.replace('_', ' ')} will be customizable here
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || isUploading}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 flex items-center space-x-2"
        >
          <Upload className="w-5 h-5" />
          <span>
            {isUploading ? 'Uploading...' : `Process ${files.length} File${files.length !== 1 ? 's' : ''}`}
          </span>
        </button>
      </div>
    </div>
  )
}

export default BatchUploader