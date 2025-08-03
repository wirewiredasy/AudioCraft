import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip
} from '@mui/material'
import { VolumeOff, Download, PlayArrow } from '@mui/icons-material'
import AudioUploader from '../components/AudioUploader'
import AudioPlayer from '../components/AudioPlayer'
import WaveformVisualizer from '../components/WaveformVisualizer'
import axios from 'axios'

function VocalRemoverPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [processingProgress, setProcessingProgress] = useState(0)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setProcessedAudio(null)
    setError(null)
  }

  const processVocalRemoval = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)
    setProcessingProgress(0)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const response = await axios.post('/remove-vocals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000, // 5 minutes timeout
      })

      clearInterval(progressInterval)
      setProcessingProgress(100)

      if (response.data.processed_file_url) {
        setProcessedAudio(response.data.processed_file_url)
      } else {
        // For now, show the API response since actual processing isn't implemented yet
        setError('Vocal removal service is being set up. The API endpoint is ready and will process your audio once all dependencies are installed.')
      }
    } catch (err) {
      setError(`Processing failed: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadProcessedAudio = () => {
    if (processedAudio) {
      const link = document.createElement('a')
      link.href = processedAudio
      link.download = `${selectedFile.name.replace(/\.[^/.]+$/, '')}_vocals_removed.wav`
      link.click()
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <VolumeOff sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Vocal Remover
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Remove vocals from any song using AI-powered source separation
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="AI-Powered" color="primary" variant="outlined" />
          <Chip label="Spleeter Technology" color="secondary" variant="outlined" />
          <Chip label="High Quality" color="success" variant="outlined" />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          How it works:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Our AI-powered vocal remover uses advanced source separation technology to isolate and remove vocal tracks 
          while preserving the instrumental music. Upload your audio file and let our algorithm do the magic!
        </Typography>
      </Paper>

      <AudioUploader onFileSelect={handleFileSelect} />

      {selectedFile && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Selected File: {selectedFile.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </Typography>

          <WaveformVisualizer audioFile={selectedFile} />

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={processVocalRemoval}
              disabled={isProcessing}
              startIcon={isProcessing ? <CircularProgress size={20} /> : <VolumeOff />}
              sx={{ px: 4, py: 1.5 }}
            >
              {isProcessing ? `Processing... ${processingProgress}%` : 'Remove Vocals'}
            </Button>
          </Box>

          {isProcessing && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="textSecondary">
                    {processingProgress}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Processing your audio... This may take a few minutes
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {error && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {processedAudio && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="success.main">
            Vocals Removed Successfully!
          </Typography>
          
          <AudioPlayer 
            src={processedAudio} 
            title="Vocals Removed Audio"
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={downloadProcessedAudio}
            >
              Download Result
            </Button>
            <Button
              variant="outlined"
              startIcon={<PlayArrow />}
            >
              Preview
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default VocalRemoverPage