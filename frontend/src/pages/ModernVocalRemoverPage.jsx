import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import axios from 'axios'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const uploadSchema = z.object({
  file: z.any().refine((files) => files?.length > 0, "Audio file is required"),
})

function ModernVocalRemoverPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(uploadSchema)
  })

  const watchedFile = watch('file')

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setValue('file', acceptedFiles)
      toast.success('File uploaded successfully')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  const onSubmit = async (data) => {
    if (!data.file || data.file.length === 0) {
      toast.error('Please select an audio file')
      return
    }

    setIsProcessing(true)
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', data.file[0])

    try {
      const response = await axios.post('/remove-vocals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        }
      })

      if (response.data.success) {
        setProcessedAudio(response.data)
        toast.success('Vocals removed successfully!')
      } else {
        toast.error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            AI Vocal Remover
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Remove vocals from any song using advanced AI technology. 
            Perfect for creating karaoke tracks or instrumental versions.
          </p>
        </motion.div>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Audio File</CardTitle>
            <CardDescription>
              Supported formats: MP3, WAV, FLAC, M4A, AAC, OGG (Max 100MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* File Drop Zone */}
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200",
                  isDragActive 
                    ? "border-primary-main bg-primary-main/5" 
                    : "border-border hover:border-primary-main hover:bg-gray-50"
                )}
              >
                <input {...getInputProps()} {...register('file')} />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-primary-main/10 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  {watchedFile && watchedFile.length > 0 ? (
                    <div className="text-center">
                      <p className="text-text-primary font-medium">
                        {watchedFile[0].name}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {(watchedFile[0].size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-text-primary font-medium">
                        Drop your audio file here, or click to browse
                      </p>
                      <p className="text-text-secondary text-sm">
                        Drag and drop your audio file here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {errors.file && (
                <p className="text-error text-sm">{errors.file.message}</p>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Processing...</span>
                    <span className="text-text-secondary">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-primary-main h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={!watchedFile || isProcessing}
                loading={isProcessing}
              >
                {isProcessing ? 'Removing Vocals...' : 'Remove Vocals'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      {processedAudio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Vocal Removal Complete</span>
              </CardTitle>
              <CardDescription>
                Your audio has been processed successfully. Download the vocal-free version below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Audio Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <audio 
                    controls 
                    className="w-full"
                    src={processedAudio.download_url}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Download Button */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full" 
                  asChild
                >
                  <a 
                    href={processedAudio.download_url} 
                    download
                    className="flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Vocal-Free Audio</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* How it Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Upload',
                  description: 'Upload your audio file in any supported format'
                },
                {
                  step: '2',
                  title: 'Process',
                  description: 'Our AI analyzes and separates vocal and instrumental parts'
                },
                {
                  step: '3',
                  title: 'Download',
                  description: 'Download your high-quality vocal-free audio file'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-main text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ModernVocalRemoverPage