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
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { ContentCut, Download, PlayArrow, Add } from '@mui/icons-material'
import AudioUploader from '../components/AudioUploader'
import AudioPlayer from '../components/AudioPlayer'
import WaveformVisualizer from '../components/WaveformVisualizer'
import axios from 'axios'

function AudioEditorPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [joinFile, setJoinFile] = useState(null)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [operation, setOperation] = useState('cut')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setProcessedAudio(null)
    setError(null)
  }

  const handleJoinFileSelect = (file) => {
    setJoinFile(file)
  }

  const processAudio = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('operation', operation)
    
    if (operation === 'cut') {
      if (startTime) formData.append('start_time', startTime)
      if (endTime) formData.append('end_time', endTime)
    } else if (operation === 'join' && joinFile) {
      formData.append('join_file', joinFile)
    }

    try {
      const response = await axios.post('/cut-join-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000,
      })

      if (response.data.processed_file_url) {
        setProcessedAudio(response.data.processed_file_url)
      } else {
        setError('Audio editing service is being set up. The API endpoint is ready and will process your audio once all dependencies are installed.')
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
        <ContentCut sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Audio Editor
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Cut, join, and edit audio files with precision
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Waveform Editor" color="primary" variant="outlined" />
          <Chip label="Precision Cutting" color="secondary" variant="outlined" />
          <Chip label="Audio Joining" color="success" variant="outlined" />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Operation Type
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Operation</InputLabel>
          <Select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            label="Select Operation"
          >
            <MenuItem value="cut">Cut Audio (Extract portion)</MenuItem>
            <MenuItem value="join">Join Audio Files</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <AudioUploader onFileSelect={handleFileSelect} />

      {selectedFile && (
        <>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {operation === 'cut' ? 'Cut Settings' : 'Join Settings'}
            </Typography>
            
            {operation === 'cut' ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Start Time (seconds)"
                    type="number"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    fullWidth
                    helperText="Leave empty to start from beginning"
                    inputProps={{ min: 0, step: 0.1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="End Time (seconds)"
                    type="number"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    fullWidth
                    helperText="Leave empty to cut till end"
                    inputProps={{ min: 0, step: 0.1 }}
                  />
                </Grid>
              </Grid>
            ) : (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Select second audio file to join:
                </Typography>
                <AudioUploader onFileSelect={handleJoinFileSelect} />
                {joinFile && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Second file selected: {joinFile.name}
                  </Alert>
                )}
              </Box>
            )}

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={processAudio}
                disabled={isProcessing || (operation === 'join' && !joinFile)}
                startIcon={isProcessing ? <CircularProgress size={20} /> : 
                  operation === 'cut' ? <ContentCut /> : <Add />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isProcessing ? 'Processing...' : 
                 operation === 'cut' ? 'Cut Audio' : 'Join Audio Files'}
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
            Audio Editing Completed!
          </Typography>
          
          <AudioPlayer 
            src={processedAudio} 
            title={`${operation === 'cut' ? 'Cut' : 'Joined'} Audio`}
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

export default AudioEditorPage