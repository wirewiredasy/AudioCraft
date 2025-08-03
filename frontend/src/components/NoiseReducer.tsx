import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Download, CheckCircle, AlertCircle, Shield, Volume2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

export const NoiseReducer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [noiseReductionStrength, setNoiseReductionStrength] = useState<number>(0.5)
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
          return prev + Math.random() * 6
        })
      }, 600)
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  const handleProcess = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)
    setProgress(0)

    try {
      toast.loading('Reducing background noise...', { id: 'processing' })
      const response = await audioApi.reduceNoise(selectedFile, noiseReductionStrength)
      setProgress(100)
      setResult(response)
      toast.success('Noise reduction completed!', { id: 'processing' })
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to reduce noise'
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

  const getStrengthLabel = (value: number) => {
    if (value <= 0.2) return 'Very Mild'
    if (value <= 0.4) return 'Mild'
    if (value <= 0.6) return 'Moderate'
    if (value <= 0.8) return 'Strong'
    return 'Maximum'
  }

  const getStrengthColor = (value: number) => {
    if (value <= 0.3) return 'text-blue-600'
    if (value <= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

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
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Noise Reduction</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Remove background noise and enhance audio clarity using AI
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
                    {/* Noise Reduction Strength */}
                    <motion.div 
                      className="space-y-4 p-4 bg-muted/30 rounded-lg"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Noise Reduction Strength
                        </Label>
                        <div className={`text-sm font-medium ${getStrengthColor(noiseReductionStrength)}`}>
                          {getStrengthLabel(noiseReductionStrength)} ({noiseReductionStrength.toFixed(1)})
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="range"
                          value={noiseReductionStrength}
                          onChange={(e) => setNoiseReductionStrength(Number(e.target.value))}
                          min="0.1"
                          max="1.0"
                          step="0.1"
                          className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider"
                          disabled={isProcessing}
                        />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Mild (0.1)</span>
                          <span>Strong (1.0)</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded text-blue-700">
                            <div className="font-medium">Mild</div>
                            <div>Preserves quality</div>
                          </div>
                          <div className="text-center p-2 bg-yellow-50 rounded text-yellow-700">
                            <div className="font-medium">Moderate</div>
                            <div>Balanced approach</div>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded text-red-700">
                            <div className="font-medium">Strong</div>
                            <div>Maximum cleanup</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

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
                          <Shield className="h-5 w-5" />
                          Reducing Noise... {Math.round(progress)}%
                        </motion.div>
                      ) : (
                        <>
                          <Shield className="h-5 w-5 mr-2" />
                          Reduce Background Noise
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
                        <Shield className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-blue-900">Processing Audio</p>
                        <p className="text-xs text-blue-700">Analyzing and removing noise...</p>
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
                        <p className="font-medium text-red-900 mb-1">Processing Failed</p>
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
                        <p className="font-medium text-green-900">Noise Reduction Complete!</p>
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
              <h3 className="font-medium mb-2 text-sm">Best Practices</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Start with mild settings</li>
                <li>• Higher strength = more artifacts</li>
                <li>• Works best on consistent noise</li>
                <li>• Preview before final export</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}