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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material'
import { SwapHoriz, Download, PlayArrow } from '@mui/icons-material'
import AudioUploader from '../components/AudioUploader'
import AudioPlayer from '../components/AudioPlayer'
import WaveformVisualizer from '../components/WaveformVisualizer'
import axios from 'axios'

const audioFormats = [
  { value: 'mp3', label: 'MP3', description: 'Universal compatibility, good compression' },
  { value: 'wav', label: 'WAV', description: 'Uncompressed, highest quality' },
  { value: 'flac', label: 'FLAC', description: 'Lossless compression, smaller than WAV' },
  { value: 'aac', label: 'AAC', description: 'Better quality than MP3 at same bitrate' },
  { value: 'ogg', label: 'OGG', description: 'Open source, good compression' },
  { value: 'm4a', label: 'M4A', description: 'Apple format, good quality' }
]

function FormatConverterPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [processedAudio, setProcessedAudio] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [targetFormat, setTargetFormat] = useState('mp3')

  const handleFileSelect = (file) => {
    setSelectedFile(file)
    setProcessedAudio(null)
    setError(null)
  }

  const convertFormat = async () => {
    if (!selectedFile || !targetFormat) return

    setIsProcessing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('target_format', targetFormat)

    try {
      const response = await axios.post('/convert-format', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000,
      })

      if (response.data.processed_file_url) {
        setProcessedAudio(response.data.processed_file_url)
      } else {
        setError('Format conversion service is being set up. The API endpoint is ready and will process your audio once all dependencies are installed.')
      }
    } catch (err) {
      setError(`Conversion failed: ${err.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const getFileFormat = (filename) => {
    return filename.split('.').pop().toLowerCase()
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SwapHoriz sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Format Converter
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Convert between all major audio formats with high quality
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="FFmpeg Powered" color="primary" variant="outlined" />
          <Chip label="High Quality" color="secondary" variant="outlined" />
          <Chip label="Metadata Preserved" color="success" variant="outlined" />
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Supported Formats:
        </Typography>
        <Grid container spacing={2}>
          {audioFormats.map((format) => (
            <Grid item xs={12} sm={6} md={4} key={format.value}>
              <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <Typography variant="h6" color="primary.main">
                  {format.label}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {format.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <AudioUploader onFileSelect={handleFileSelect} />

      {selectedFile && (
        <>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Conversion Settings
            </Typography>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Source Format
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {getFileFormat(selectedFile.name).toUpperCase()}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <SwapHoriz sx={{ fontSize: 32, color: 'primary.main' }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Target Format</InputLabel>
                  <Select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value)}
                    label="Target Format"
                  >
                    {audioFormats.map((format) => (
                      <MenuItem key={format.value} value={format.value}>
                        <Box>
                          <Typography variant="body1">
                            {format.label}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {format.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={convertFormat}
                disabled={isProcessing || !targetFormat}
                startIcon={isProcessing ? <CircularProgress size={20} /> : <SwapHoriz />}
                sx={{ px: 4, py: 1.5 }}
              >
                {isProcessing ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
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
            Conversion Completed!
          </Typography>
          
          <AudioPlayer 
            src={processedAudio} 
            title={`Converted Audio (${targetFormat.toUpperCase()})`}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Download />}
            >
              Download {targetFormat.toUpperCase()}
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

export default FormatConverterPage