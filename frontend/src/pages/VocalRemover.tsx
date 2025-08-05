import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Upload, Download, Volume2, FileAudio, Loader2 } from 'lucide-react'

export default function VocalRemover() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedFile, setProcessedFile] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      toast.success(`File "${file.name}" uploaded successfully`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    maxFiles: 1
  })

  const processAudio = async () => {
    if (!uploadedFile) {
      toast.error('Please upload an audio file first')
      return
    }

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', uploadedFile)

    try {
      const response = await axios.post('/remove-vocals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        setProcessedFile(response.data.download_url)
        toast.success('Vocals removed successfully!')
      } else {
        toast.error(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      toast.error('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = () => {
    if (processedFile) {
      window.open(processedFile, '_blank')
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Volume2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Vocal Remover
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remove vocals from any audio track using AI-powered center channel extraction. 
              Perfect for creating karaoke tracks or instrumental versions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Audio File
                </CardTitle>
                <CardDescription>
                  Supports MP3, WAV, FLAC, M4A, AAC, and OGG formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <FileAudio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  {uploadedFile ? (
                    <div>
                      <p className="text-foreground font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : isDragActive ? (
                    <p className="text-foreground">Drop the audio file here...</p>
                  ) : (
                    <div>
                      <p className="text-foreground mb-2">
                        Drag & drop an audio file here, or click to select
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Maximum file size: 100MB
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={processAudio}
                  disabled={!uploadedFile || isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Remove Vocals
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Processed Audio
                </CardTitle>
                <CardDescription>
                  Download your vocal-removed audio file
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedFile ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Processing Complete!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your vocal-removed audio is ready for download
                    </p>
                    <Button
                      onClick={downloadFile}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download File
                    </Button>
                  </motion.div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <FileAudio className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Upload and process an audio file to see results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Section */}
          <Card className="mt-8 glass border-border/50">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your audio file in any supported format
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Process</h3>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes and removes vocals using center channel extraction
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your instrumental track ready for karaoke or remixing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}