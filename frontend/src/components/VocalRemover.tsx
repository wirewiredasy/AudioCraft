import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Download, AudioWaveform, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'
import clsx from 'clsx'

export const VocalRemover: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)
    setError(null)
    setProgress(0)
    toast.success(`File selected: ${file.name}`)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setResult(null)
    setError(null)
    setProgress(0)
  }

  // Simulate progress during processing
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)
    setProgress(0)

    try {
      toast.loading('Processing your audio file...', { id: 'processing' })
      const response = await audioApi.removeVocals(selectedFile)
      setProgress(100)
      setResult(response)
      toast.success('Vocals removed successfully!', { id: 'processing' })
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to process audio file'
      setError(errorMsg)
      toast.error(errorMsg, { id: 'processing' })
    } finally {
      setIsProcessing(false)
    }
  }

  const togglePlayback = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <AudioWaveform className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Vocal Remover</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your audio file to remove vocals and create karaoke tracks
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload 
                onFileSelect={handleFileSelect}
                onRemoveFile={handleRemoveFile}
                isProcessing={isProcessing}
                progress={progress}
                selectedFile={selectedFile}
              />
              
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      onClick={handleProcess}
                      disabled={!selectedFile || isProcessing}
                      className="w-full h-12 text-base font-medium relative overflow-hidden"
                      size="lg"
                    >
                      {isProcessing ? (
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <AudioWaveform className="h-5 w-5" />
                          Removing Vocals... {Math.round(progress)}%
                        </motion.div>
                      ) : (
                        <>
                          <AudioWaveform className="h-5 w-5 mr-2" />
                          Remove Vocals with AI
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status & Results */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Processing Status */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <AudioWaveform className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-blue-900">Processing Audio</p>
                        <p className="text-xs text-blue-700">Separating vocal tracks...</p>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-blue-600 mt-2 text-center">{Math.round(progress)}% complete</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-900 mb-1">Processing Failed</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Success!</p>
                        <p className="text-sm text-green-700">{result.message}</p>
                      </div>
                    </div>
                    
                    {result.output_url && (
                      <div className="space-y-3">
                        <div className="p-3 bg-white/50 rounded-lg">
                          <audio 
                            ref={setAudioElement}
                            className="w-full"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                          >
                            <source src={result.output_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={togglePlayback}
                            className="flex-1"
                          >
                            {isPlaying ? (
                              <><Pause className="h-4 w-4 mr-2" />Pause</>
                            ) : (
                              <><Play className="h-4 w-4 mr-2" />Play</>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <a href={result.output_url} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Card */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-sm">How it works</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• AI separates vocal and instrumental tracks</li>
                <li>• Works best with centered vocals</li>
                <li>• Supports MP3, WAV, FLAC formats</li>
                <li>• Processing takes 30-60 seconds</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}