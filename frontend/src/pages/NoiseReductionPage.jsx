import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Slider,
  Grid
} from '@mui/material'
import { MusicNote, Download, PlayArrow } from '@mui/icons-material'
import AudioUploader from '../components/AudioUploader'
import AudioPlayer from '../components/AudioPlayer'
import WaveformVisualizer from '../components/WaveformVisualizer'
import axios from 'axios'

function NoiseReductionPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [noiseReductionStrength, setNoiseReductionStrength] = useState(0.5)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setProcessedAudio(null)
    setError(null)
  }

  const processNoiseReduction = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('noise_reduction_strength', noiseReductionStrength.toString())

    try {
      const response = await axios.post('/reduce-noise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000,
      })

      if (response.data.processed_file_url) {
        setProcessedAudio(response.data.processed_file_url)
      } else {
        setError('Noise reduction service is being set up. The API endpoint is ready and will process your audio once all dependencies are installed.')
      }
    } catch (err) {
      setError(`Processing failed: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <MusicNote sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Noise Reduction
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Remove background noise and unwanted artifacts from your audio
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Spectral Subtraction" color="primary" variant="outlined" />
          <Chip label="Adaptive Filtering" color="secondary" variant="outlined" />
          <Chip label="AI Denoising" color="success" variant="outlined" />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          How Noise Reduction Works:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Our advanced noise reduction algorithm analyzes your audio to identify and remove unwanted background noise, 
          hum, hiss, and other artifacts while preserving the quality of your main audio content.
        </Typography>
      </Paper>

      <AudioUploader onFileSelect={handleFileSelect} />

      {selectedFile && (
        <>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Noise Reduction Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Noise Reduction Strength
                </Typography>
                <Slider
                  value={noiseReductionStrength}
                  onChange={(e, value) => setNoiseReductionStrength(value)}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  marks={[
                    { value: 0.1, label: 'Light' },
                    { value: 0.5, label: 'Medium' },
                    { value: 1.0, label: 'Strong' }
                  ]}
                  valueLabelDisplay="on"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Higher values remove more noise but may affect audio quality. 
                  Start with medium setting and adjust as needed.
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={processNoiseReduction}
                disabled={isProcessing}
                startIcon={isProcessing ? <CircularProgress size={20} /> : <MusicNote />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isProcessing ? 'Reducing Noise...' : 'Reduce Noise'}
              </Button>
            </Box>
          </Paper>

          <WaveformVisualizer audioFile={selectedFile} />
        </>
      )}

      {error && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {processedAudio && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="success.main">
            Noise Reduction Completed!
          </Typography>
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Background noise has been reduced while preserving audio quality.
          </Typography>
          
          <AudioPlayer 
            src={processedAudio} 
            title="Noise Reduced Audio"
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
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

export default NoiseReductionPage