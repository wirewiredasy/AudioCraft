import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Download, CheckCircle, AlertCircle, Scissors, Link, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import { FileUpload } from './FileUpload'
import { audioApi } from '../lib/api'

export const AudioCutter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [joinFile, setJoinFile] = useState<File | null>(null)
  const [operation, setOperation] = useState<'cut' | 'join'>('cut')
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(30)
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

  const handleJoinFileSelect = (file: File) => {
    setJoinFile(file)
    setResult(null)
    setError(null)
    toast.success(`Second file selected: ${file.name}`)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setResult(null)
    setError(null)
    setProgress(0)
  }

  const handleRemoveJoinFile = () => {
    setJoinFile(null)
    setResult(null)
    setError(null)
  }

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 8
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
      const operationText = operation === 'cut' ? 'Cutting audio segment...' : 'Joining audio files...'
      toast.loading(operationText, { id: 'processing' })
      
      const response = await audioApi.cutJoinAudio(
        selectedFile,
        operation,
        operation === 'cut' ? startTime : undefined,
        operation === 'cut' ? endTime : undefined,
        operation === 'join' ? joinFile || undefined : undefined
      )
      
      setProgress(100)
      setResult(response)
      toast.success('Audio processing completed!', { id: 'processing' })
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to process audio'
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
                  {operation === 'cut' ? (
                    <Scissors className="h-5 w-5 text-primary" />
                  ) : (
                    <Link className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">Audio Cutter & Joiner</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cut audio segments or join multiple files together
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Operation Toggle */}
              <div className="flex p-1 bg-muted rounded-lg">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                    operation === 'cut' 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setOperation('cut')}
                >
                  <Scissors className="h-4 w-4" />
                  Cut Audio
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                    operation === 'join' 
                      ? 'bg-background shadow-sm text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setOperation('join')}
                >
                  <Link className="h-4 w-4" />
                  Join Audio
                </button>
              </div>

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
                    {operation === 'cut' ? (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="start" className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Start Time (seconds)
                            </Label>
                            <Input
                              id="start"
                              type="number"
                              value={startTime}
                              onChange={(e) => setStartTime(Number(e.target.value) || 0)}
                              min={0}
                              step={0.1}
                              className="h-12"
                            />
                            <p className="text-xs text-muted-foreground">
                              Time: {formatTime(startTime)}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <Label htmlFor="end" className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              End Time (seconds)
                            </Label>
                            <Input
                              id="end"
                              type="number"
                              value={endTime}
                              onChange={(e) => setEndTime(Number(e.target.value) || 30)}
                              min={0}
                              step={0.1}
                              className="h-12"
                            />
                            <p className="text-xs text-muted-foreground">
                              Time: {formatTime(endTime)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <p className="text-sm font-medium">
                            Segment Duration: {formatTime(Math.max(0, endTime - startTime))}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Second file to join:</Label>
                          <FileUpload 
                            onFileSelect={handleJoinFileSelect}
                            onRemoveFile={handleRemoveJoinFile}
                            isProcessing={isProcessing}
                            selectedFile={joinFile}
                          />
                        </div>
                      </motion.div>
                    )}

                    <Button 
                      onClick={handleProcess}
                      disabled={!selectedFile || isProcessing || (operation === 'join' && !joinFile)}
                      className="w-full h-12 text-base font-medium"
                      size="lg"
                    >
                      {isProcessing ? (
                        <motion.div 
                          className="flex items-center gap-2"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {operation === 'cut' ? (
                            <Scissors className="h-5 w-5" />
                          ) : (
                            <Link className="h-5 w-5" />
                          )}
                          Processing... {Math.round(progress)}%
                        </motion.div>
                      ) : (
                        <>
                          {operation === 'cut' ? (
                            <><Scissors className="h-5 w-5 mr-2" />Cut Audio Segment</>
                          ) : (
                            <><Link className="h-5 w-5 mr-2" />Join Audio Files</>
                          )}
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
                        {operation === 'cut' ? (
                          <Scissors className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Link className="h-5 w-5 text-blue-600" />
                        )}
                      </motion.div>
                      <div>
                        <p className="font-medium text-blue-900">Processing Audio</p>
                        <p className="text-xs text-blue-700">
                          {operation === 'cut' ? 'Cutting segment...' : 'Joining files...'}
                        </p>
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
              <h3 className="font-medium mb-2 text-sm">Pro Tips</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Cut: Extract specific segments</li>
                <li>• Join: Combine multiple files</li>
                <li>• Use precise timestamps</li>
                <li>• Preview before processing</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}