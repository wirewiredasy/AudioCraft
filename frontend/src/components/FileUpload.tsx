import React, { useCallback } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  acceptedFormats?: string
  maxSize?: number
  isProcessing?: boolean
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFormats = '.mp3,.wav,.flac,.m4a,.ogg',
  maxSize = 100 * 1024 * 1024, // 100MB
  isProcessing = false
}) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > maxSize) {
        alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
        return
      }
      onFileSelect(file)
    }
  }, [onFileSelect, maxSize])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      if (file.size > maxSize) {
        alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
        return
      }
      onFileSelect(file)
    }
  }, [onFileSelect, maxSize])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:border-gray-400"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <div className="text-4xl text-gray-400">🎵</div>
            <div>
              <p className="text-lg font-medium mb-2">
                Drop your audio file here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: {acceptedFormats.replace(/\./g, '').replace(/,/g, ', ')}
              </p>
              <p className="text-sm text-gray-500">
                Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
            <input
              type="file"
              accept={acceptedFormats}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={isProcessing}
            />
            <label htmlFor="file-upload">
              <Button 
                variant="outline" 
                disabled={isProcessing}
                className="cursor-pointer"
                asChild
              >
                <span>
                  {isProcessing ? 'Processing...' : 'Choose File'}
                </span>
              </Button>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}