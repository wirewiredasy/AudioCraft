import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, Music, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import clsx from 'clsx'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  acceptedFormats?: string
  maxSize?: number
  isProcessing?: boolean
  progress?: number
  selectedFile?: File | null
  onRemoveFile?: () => void
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFormats = '.mp3,.wav,.flac,.m4a,.ogg',
  maxSize = 100 * 1024 * 1024, // 100MB
  isProcessing = false,
  progress = 0,
  selectedFile,
  onRemoveFile
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      if (file.size > maxSize) {
        // TODO: Replace with Sonner toast
        alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
        return
      }
      onFileSelect(file)
    }
  }, [onFileSelect, maxSize])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'audio/*': acceptedFormats.split(',')
    },
    maxSize,
    multiple: false,
    disabled: isProcessing
  })

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full overflow-hidden">
          <CardContent className="p-0">
            <div
              {...getRootProps()}
              className={clsx(
                'relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer',
                {
                  'border-blue-400 bg-blue-50/50': isDragActive && !isDragReject,
                  'border-red-400 bg-red-50/50': isDragReject,
                  'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50': !isDragActive && !isDragReject,
                  'cursor-not-allowed opacity-60': isProcessing
                }
              )}
            >
              <input {...getInputProps()} />
              <motion.div
                className="space-y-4"
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ 
                    rotate: isDragActive ? 10 : 0,
                    scale: isDragActive ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                </motion.div>
                
                <div>
                  <p className="text-lg font-medium mb-2 text-foreground">
                    {isDragActive 
                      ? 'Drop your audio file here!' 
                      : 'Drop your audio file here or click to browse'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: {acceptedFormats.replace(/\./g, '').replace(/,/g, ', ').toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB
                  </p>
                </div>

                {!isDragActive && (
                  <Button 
                    variant="outline" 
                    disabled={isProcessing}
                    className="mt-4"
                  >
                    {isProcessing ? 'Processing...' : 'Choose File'}
                  </Button>
                )}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Music className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {onRemoveFile && !isProcessing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onRemoveFile}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {isProcessing && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}