import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle, AlertCircle, File } from 'lucide-react'
import { validateAudioFile, RateLimiter } from './ValidationUtils'
import { LoadingSpinner, AudioProcessingLoader } from './LoadingSpinner'
import { ErrorAlert, FileUploadError } from './ErrorHandler'

// Rate limiter instance
const uploadRateLimiter = new RateLimiter(3, 60000) // 3 uploads per minute

export const EnhancedUpload = ({ 
  onFileUpload, 
  maxFiles = 1, 
  acceptedFormats = ['audio/*'],
  showPreview = true,
  className = ''
}) => {
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processingStage, setProcessingStage] = useState('')
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrors([])
    
    // Check rate limiting
    const rateLimitResult = uploadRateLimiter.isAllowed()
    if (!rateLimitResult.allowed) {
      setErrors([`Rate limit exceeded. Please wait ${rateLimitResult.retryAfter} seconds before uploading again.`])
      return
    }
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejectionErrors = rejectedFiles.map(({ file, errors }) => 
        `${file.name}: ${errors.map(e => e.message).join(', ')}`
      )
      setErrors(rejectionErrors)
    }
    
    // Validate accepted files
    const validationErrors = []
    const validFiles = []
    
    acceptedFiles.forEach(file => {
      const validation = validateAudioFile(file)
      if (validation.isValid) {
        validFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          status: 'ready',
          size: file.size,
          name: file.name
        })
      } else {
        validationErrors.push(...validation.errors.map(error => `${file.name}: ${error}`))
      }
    })
    
    if (validationErrors.length > 0) {
      setErrors(prev => [...prev, ...validationErrors])
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles].slice(0, maxFiles))
    }
  }, [maxFiles])
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.ogg', '.aac', '.m4a']
    },
    maxFiles,
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: maxFiles > 1
  })
  
  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }
  
  const handleUpload = async () => {
    if (files.length === 0 || isUploading) return
    
    setIsUploading(true)
    setUploadProgress(0)
    setProcessingStage('Preparing upload')
    
    try {
      for (const fileObj of files) {
        setProcessingStage('Uploading file')
        setUploadProgress(25)
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 200)
        
        const result = await onFileUpload(fileObj.file, {
          onProgress: (progress) => {
            setUploadProgress(Math.min(progress, 90))
          },
          onStageChange: (stage) => {
            setProcessingStage(stage)
          }
        })
        
        clearInterval(progressInterval)
        setUploadProgress(100)
        setProcessingStage('Upload complete')
        
        // Update file status
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'uploaded', result }
            : f
        ))
      }
    } catch (error) {
      setErrors([error.message || 'Upload failed. Please try again.'])
      setFiles(prev => prev.map(f => ({ ...f, status: 'error' })))
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      setProcessingStage('')
    }
  }
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`upload-zone transition-all duration-300 ${
          isDragActive 
            ? 'dragover scale-105' 
            : isDragReject 
              ? 'border-red-500/50 bg-red-500/10' 
              : ''
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Upload className={`w-8 h-8 transition-all ${
              isDragActive ? 'text-blue-400 scale-110' : 'text-gray-400'
            }`} />
          </div>
          
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-400">Drop your files here!</p>
          ) : (
            <>
              <p className="text-lg font-medium text-white mb-2">
                Drag & drop your audio files here
              </p>
              <p className="text-sm text-gray-400 mb-4">
                or click to browse files
              </p>
              <p className="text-xs text-gray-500">
                Supports: MP3, WAV, FLAC, OGG, AAC, M4A (max 100MB)
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Error Messages */}
      {errors.map((error, index) => (
        <FileUploadError
          key={index}
          error={error}
          onDismiss={() => setErrors(prev => prev.filter((_, i) => i !== index))}
        />
      ))}
      
      {/* File Preview */}
      {showPreview && files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Selected Files</h3>
          {files.map((fileObj) => (
            <div key={fileObj.id} className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <File className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{fileObj.name}</p>
                    <p className="text-xs text-gray-400">{formatFileSize(fileObj.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {fileObj.status === 'ready' && (
                    <span className="text-xs text-yellow-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Ready
                    </span>
                  )}
                  {fileObj.status === 'uploaded' && (
                    <span className="text-xs text-green-400 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </span>
                  )}
                  {fileObj.status === 'error' && (
                    <span className="text-xs text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Error
                    </span>
                  )}
                  
                  {!isUploading && (
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload Progress */}
      {isUploading && (
        <AudioProcessingLoader 
          progress={uploadProgress} 
          stage={processingStage}
        />
      )}
      
      {/* Upload Button */}
      {files.length > 0 && !isUploading && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="btn-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                     px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <LoadingSpinner size="sm" variant="white" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Start Processing</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Rate Limiting Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          {uploadRateLimiter.getRemainingRequests()} uploads remaining this minute
        </p>
      </div>
    </div>
  )
}

export default EnhancedUpload