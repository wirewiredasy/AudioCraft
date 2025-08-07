import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, File, X } from 'lucide-react'

export default function Upload({ 
  onFileSelect, 
  acceptedFormats = ['.mp3', '.wav', '.flac', '.m4a', '.aac'], 
  maxSize = 50,
  title = "Upload Audio File",
  description = "Drag and drop your audio file here or click to browse"
}) {
  const [file, setFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': acceptedFormats
    },
    maxSize: maxSize * 1024 * 1024,
    multiple: false
  })

  const removeFile = () => {
    setFile(null)
    onFileSelect(null)
  }

  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-purple-400 bg-purple-500/10' 
              : 'border-gray-600 hover:border-purple-400 hover:bg-purple-500/5'
          }`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">{description}</p>
          <p className="text-gray-400 text-sm">
            Supported formats: {acceptedFormats.join(', ')} (Max {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="border-2 border-green-500 rounded-2xl p-6 bg-green-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <File className="w-12 h-12 text-green-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}