import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  LinearProgress,
  Grid,
  Paper,
  Chip,
  Alert,
  IconButton,
  Divider
} from '@mui/material'
import {
  VolumeOff,
  CloudUpload,
  Download,
  PlayArrow,
  GraphicEq,
  CheckCircle,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material'
import AudioWaveform from '../components/AudioWaveform'
import axios from 'axios'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

function ImprovedVocalRemoverPage() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setUploadedFile(file)
      setError(null)
      setProcessedAudio(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg']
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  const handleRemoveVocals = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    setUploadProgress(0)
    setError(null)

    const formData = new FormData()
    formData.append('file', uploadedFile)

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
      } else {
        setError(response.data.error || 'Processing failed')
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      setError('Failed to process audio. Please try again.')
    } finally {
      setIsProcessing(false)
      setUploadProgress(0)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Box textAlign="center" mb={6}>
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
              <VolumeOff sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h1" component="h1">
                AI Vocal Remover
              </Typography>
            </Box>
            <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
              Remove vocals from any song using advanced AI technology. Perfect for creating karaoke tracks or instrumental versions.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Upload Section */}
          <Grid item xs={12} lg={8}>
            <motion.div variants={itemVariants}>
              <Card elevation={0} sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CloudUpload color="primary" />
                    Upload Audio File
                  </Typography>
                  
                  {/* Dropzone */}
                  <Paper
                    {...getRootProps()}
                    sx={{
                      p: 4,
                      border: '2px dashed',
                      borderColor: isDragActive ? 'primary.main' : 'grey.300',
                      borderRadius: 2,
                      backgroundColor: isDragActive ? 'primary.50' : 'grey.50',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.50',
                      }
                    }}
                  >
                    <input {...getInputProps()} />
                    
                    <motion.div
                      animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                      
                      {uploadedFile ? (
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {uploadedFile.name}
                          </Typography>
                          <Box display="flex" justifyContent="center" gap={2} mb={2}>
                            <Chip label={formatFileSize(uploadedFile.size)} color="primary" />
                            <Chip label={uploadedFile.type} variant="outlined" />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Click to change file or drag and drop a new one
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {isDragActive ? 'Drop your audio file here' : 'Drag & drop your audio file here'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            or click to browse files
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Supported formats: MP3, WAV, FLAC, M4A, AAC, OGG (Max 100MB)
                          </Typography>
                        </Box>
                      )}
                    </motion.div>
                  </Paper>

                  {/* Processing Progress */}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box mt={3}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="primary">
                            Processing audio...
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {uploadProgress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {/* Process Button */}
                  <Box mt={3} textAlign="center">
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleRemoveVocals}
                      disabled={!uploadedFile || isProcessing}
                      startIcon={isProcessing ? <GraphicEq className="animate-pulse" /> : <VolumeOff />}
                      sx={{ 
                        px: 6, 
                        py: 2,
                        fontSize: '1.1rem',
                        minWidth: 200
                      }}
                    >
                      {isProcessing ? 'Removing Vocals...' : 'Remove Vocals'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            {processedAudio && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card elevation={0}>
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                      <CheckCircle sx={{ color: 'success.main', fontSize: 32 }} />
                      <Typography variant="h5">
                        Vocal Removal Complete!
                      </Typography>
                    </Box>

                    <Alert severity="success" sx={{ mb: 3 }}>
                      Your audio has been processed successfully. The vocals have been removed using AI separation technology.
                    </Alert>

                    {/* Audio Waveform */}
                    <AudioWaveform 
                      audioUrl={processedAudio.download_url}
                      height={120}
                      color="#2563eb"
                    />

                    <Box mt={3} textAlign="center">
                      <Button
                        variant="contained"
                        size="large"
                        href={processedAudio.download_url}
                        download
                        startIcon={<Download />}
                        sx={{ px: 6, py: 2 }}
                      >
                        Download Vocal-Free Audio
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </Grid>

          {/* Info Sidebar */}
          <Grid item xs={12} lg={4}>
            <motion.div variants={itemVariants}>
              <Card elevation={0} sx={{ position: 'sticky', top: 20 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon color="primary" />
                    How It Works
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {[
                      { step: '1', title: 'Upload', description: 'Upload your audio file in any supported format' },
                      { step: '2', title: 'AI Processing', description: 'Our AI analyzes and separates vocal and instrumental parts' },
                      { step: '3', title: 'Download', description: 'Download your high-quality vocal-free audio file' }
                    ].map((item, index) => (
                      <Box key={index} display="flex" gap={2} mb={3}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            flexShrink: 0
                          }}
                        >
                          {item.step}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Features
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {[
                      'AI-powered vocal separation',
                      'High quality output',
                      'Multiple format support',
                      'Fast processing',
                      'No quality loss'
                    ].map((feature, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />
                        <Typography variant="body2">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  )
}

export default ImprovedVocalRemoverPage