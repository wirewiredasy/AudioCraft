import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, File, AlertCircle } from 'lucide-react'

export default function Upload({ 
  onFileSelect, 
  isProcessing = false, 
  accept = "audio/*",
  title = "Upload Audio File",
  description = "Drag and drop your audio file here, or click to browse"
}) {
  const [uploadError, setUploadError] = useState(null)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setUploadError(null)
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0].code === 'file-too-large') {
        setUploadError('File is too large. Maximum size is 100MB.')
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setUploadError('Invalid file type. Please upload an audio file.')
      } else {
        setUploadError('File upload failed. Please try again.')
      }
      return
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onFileSelect(file)
    }
  }, [onFileSelect])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a', '.wma']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
    disabled: isProcessing
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`upload-zone ${
          isDragActive ? 'dragover' : ''
        } ${
          isDragReject ? 'border-red-400 bg-red-500/10' : ''
        } ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            {isProcessing ? (
              <div className="loading-spinner w-12 h-12" />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <UploadIcon className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            {isProcessing ? 'Processing your file...' : description}
          </p>
          
          {!isProcessing && (
            <div className="text-sm text-gray-400 space-y-1">
              <p>Supported formats: MP3, WAV, FLAC, AAC, OGG, M4A, WMA</p>
              <p>Maximum file size: 100MB</p>
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="alert-error">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400">Upload Error</h4>
              <p className="text-gray-300">{uploadError}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}