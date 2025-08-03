import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Download, CheckCircle, AlertCircle, FileType, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

const SUPPORTED_FORMATS = [
  { value: 'mp3', label: 'MP3', description: 'Most compatible' },
  { value: 'wav', label: 'WAV', description: 'Uncompressed' },
  { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
  { value: 'm4a', label: 'M4A', description: 'Apple format' },
  { value: 'ogg', label: 'OGG', description: 'Open source' }
]

export const FormatConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetFormat, setTargetFormat] = useState<string>('mp3')
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

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 8
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)
    setProgress(0)

    try {
      toast.loading(`Converting to ${targetFormat.toUpperCase()}...`, { id: 'processing' })
      const response = await audioApi.convertFormat(selectedFile, targetFormat)
      setProgress(100)
      setResult(response)
      toast.success('Conversion completed successfully!', { id: 'processing' })
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to convert audio file'
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

  const currentFormat = selectedFile?.name.split('.').pop()?.toUpperCase() || ''

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Controls */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileType className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Format Converter</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Convert audio files between different formats with quality preservation
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
                    className="space-y-6"
                  >
                    {/* Format Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{currentFormat}</div>
                          <div className="text-xs text-muted-foreground">Current</div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{targetFormat.toUpperCase()}</div>
                          <div className="text-xs text-muted-foreground">Target</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">Choose target format:</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {SUPPORTED_FORMATS.map((format) => (
                            <motion.button
                              key={format.value}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                targetFormat === format.value
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-muted bg-background hover:border-primary/50'
                              }`}
                              onClick={() => setTargetFormat(format.value)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="font-medium">{format.label}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {format.description}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleProcess}
                      disabled={!selectedFile || isProcessing}
                      className="w-full h-12 text-base font-medium"
                      size="lg"
                    >
                      {isProcessing ? (
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FileType className="h-5 w-5" />
                          Converting... {Math.round(progress)}%
                        </motion.div>
                      ) : (
                        <>
                          <FileType className="h-5 w-5 mr-2" />
                          Convert to {targetFormat.toUpperCase()}
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
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <FileType className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-blue-900">Converting Audio</p>
                        <p className="text-xs text-blue-700">Processing format conversion...</p>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-blue-600 mt-2 text-center">{Math.round(progress)}% complete</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-900 mb-1">Conversion Failed</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Conversion Complete!</p>
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

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 text-sm">Format Guide</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• MP3: Universal compatibility</li>
                <li>• WAV: Best quality, large files</li>
                <li>• FLAC: Lossless compression</li>
                <li>• M4A: Apple devices optimized</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}