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
  Grid,
  TextField
} from '@mui/material'
import { Tune, Download, PlayArrow } from '@mui/icons-material'
import AudioUploader from '../components/AudioUploader'
import AudioPlayer from '../components/AudioPlayer'
import WaveformVisualizer from '../components/WaveformVisualizer'
import axios from 'axios'

function PitchTempoPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [pitchShift, setPitchShift] = useState(0)
  const [tempoChange, setTempoChange] = useState(1.0)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setProcessedAudio(null)
    setError(null)
  }

  const processPitchTempo = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('pitch_shift', pitchShift.toString())
    formData.append('tempo_change', tempoChange.toString())

    try {
      const response = await axios.post('/adjust-pitch-tempo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000,
      })

      if (response.data.processed_file_url) {
        setProcessedAudio(response.data.processed_file_url)
      } else {
        setError('Pitch & tempo adjustment service is being set up. The API endpoint is ready and will process your audio once all dependencies are installed.')
      }
    } catch (err) {
      setError(`Processing failed: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetSettings = () => {
    setPitchShift(0)
    setTempoChange(1.0)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Tune sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Pitch & Tempo Adjustment
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Change pitch and tempo independently without affecting audio quality
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Librosa Powered" color="primary" variant="outlined" />
          <Chip label="Independent Control" color="secondary" variant="outlined" />
          <Chip label="High Quality" color="success" variant="outlined" />
        </Box>
      </Box>

      <AudioUploader onFileSelect={handleFileSelect} />

      {selectedFile && (
        <>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Audio Settings
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Pitch Shift (semitones)
                </Typography>
                <Slider
                  value={pitchShift}
                  onChange={(e, value) => setPitchShift(value)}
                  min={-12}
                  max={12}
                  step={0.5}
                  marks={[
                    { value: -12, label: '-1 Octave' },
                    { value: 0, label: 'Original' },
                    { value: 12, label: '+1 Octave' }
                  ]}
                  valueLabelDisplay="on"
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="number"
                  value={pitchShift}
                  onChange={(e) => setPitchShift(parseFloat(e.target.value) || 0)}
                  inputProps={{ min: -12, max: 12, step: 0.5 }}
                  size="small"
                  label="Pitch (semitones)"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Tempo Change (multiplier)
                </Typography>
                <Slider
                  value={tempoChange}
                  onChange={(e, value) => setTempoChange(value)}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  marks={[
                    { value: 0.5, label: '0.5x' },
                    { value: 1.0, label: '1x' },
                    { value: 2.0, label: '2x' }
                  ]}
                  valueLabelDisplay="on"
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="number"
                  value={tempoChange}
                  onChange={(e) => setTempoChange(parseFloat(e.target.value) || 1.0)}
                  inputProps={{ min: 0.5, max: 2.0, step: 0.1 }}
                  size="small"
                  label="Tempo (multiplier)"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={resetSettings}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={processPitchTempo}
                disabled={isProcessing}
                startIcon={isProcessing ? <CircularProgress size={20} /> : <Tune />}
                sx={{ px: 4 }}
              >
                {isProcessing ? 'Processing...' : 'Apply Changes'}
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
            Audio Processed Successfully!
          </Typography>
          
          <AudioPlayer 
            src={processedAudio} 
            title="Pitch & Tempo Adjusted Audio"
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

export default PitchTempoPage