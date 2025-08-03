import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Avatar,
  Grid,
  Slider,
  Switch,
  FormControlLabel,
  Chip,
  LinearProgress
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  VolumeUp,
  VolumeOff,
  Tune,
  GraphicEq,
  MicNone,
  CloudUpload,
  Download,
  Settings
} from '@mui/icons-material'

function ProcessingStudioPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)
  const [pitch, setPitch] = useState(0)
  const [tempo, setTempo] = useState(100)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef(null)

  // Animated waveform
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationId
    let time = 0

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      const centerY = canvas.offsetHeight / 2
      const barWidth = 3
      const barSpacing = 4
      const numBars = Math.floor(canvas.offsetWidth / (barWidth + barSpacing))

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barSpacing)
        const amplitude = isPlaying ? 
          Math.sin(time * 0.02 + i * 0.3) * 30 + Math.sin(time * 0.01 + i * 0.1) * 20 :
          Math.sin(time * 0.005 + i * 0.5) * 5
        
        const height = Math.abs(amplitude) * (volume / 100)
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, centerY - height/2, 0, centerY + height/2)
        if (processing) {
          gradient.addColorStop(0, '#f59e0b')
          gradient.addColorStop(1, '#d97706')
        } else {
          gradient.addColorStop(0, '#3b82f6')
          gradient.addColorStop(1, '#1d4ed8')
        }
        
        ctx.fillStyle = gradient
        ctx.fillRect(x, centerY - height / 2, barWidth, height)
      }
      
      time += 1
      animationId = requestAnimationFrame(drawWaveform)
    }

    drawWaveform()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying, volume, processing])

  const handleProcess = () => {
    setProcessing(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessing(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }

  const audioTools = [
    { name: 'Vocal Remover', active: true, color: '#ef4444' },
    { name: 'Noise Reduction', active: false, color: '#10b981' },
    { name: 'Echo Cancellation', active: true, color: '#3b82f6' },
    { name: 'Dynamic Range', active: false, color: '#8b5cf6' },
    { name: 'EQ Enhancement', active: true, color: '#f59e0b' }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                fontWeight: 900,
                color: 'white',
                mb: 2,
                background: 'linear-gradient(135deg, #ffffff, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Audio Processing Studio
            </Typography>
            
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Professional audio editing with real-time preview
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Left Panel - Controls */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Upload Section */}
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                mb: 3
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
                    Audio File
                  </Typography>
                  
                  <Box sx={{
                    border: '2px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59, 130, 246, 0.05)'
                    }
                  }}>
                    <CloudUpload sx={{ fontSize: 48, color: '#3b82f6', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
                      Drop your audio file here
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      MP3, WAV, FLAC supported
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Audio Controls */}
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                mb: 3
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
                    Audio Controls
                  </Typography>
                  
                  {/* Volume */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <VolumeUp sx={{ color: '#3b82f6', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: 'white', flex: 1 }}>
                        Volume
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 600 }}>
                        {volume}%
                      </Typography>
                    </Box>
                    <Slider
                      value={volume}
                      onChange={(_, value) => setVolume(value)}
                      sx={{
                        color: '#3b82f6',
                        '& .MuiSlider-thumb': { backgroundColor: '#3b82f6' },
                        '& .MuiSlider-track': { backgroundColor: '#3b82f6' }
                      }}
                    />
                  </Box>

                  {/* Pitch */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Tune sx={{ color: '#10b981', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: 'white', flex: 1 }}>
                        Pitch
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
                        {pitch > 0 ? '+' : ''}{pitch}
                      </Typography>
                    </Box>
                    <Slider
                      value={pitch}
                      onChange={(_, value) => setPitch(value)}
                      min={-12}
                      max={12}
                      step={1}
                      sx={{
                        color: '#10b981',
                        '& .MuiSlider-thumb': { backgroundColor: '#10b981' },
                        '& .MuiSlider-track': { backgroundColor: '#10b981' }
                      }}
                    />
                  </Box>

                  {/* Tempo */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <GraphicEq sx={{ color: '#f59e0b', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: 'white', flex: 1 }}>
                        Tempo
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                        {tempo}%
                      </Typography>
                    </Box>
                    <Slider
                      value={tempo}
                      onChange={(_, value) => setTempo(value)}
                      min={50}
                      max={200}
                      sx={{
                        color: '#f59e0b',
                        '& .MuiSlider-thumb': { backgroundColor: '#f59e0b' },
                        '& .MuiSlider-track': { backgroundColor: '#f59e0b' }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Audio Tools */}
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
                    Processing Tools
                  </Typography>
                  
                  {audioTools.map((tool, index) => (
                    <Box key={tool.name} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: tool.active ? tool.color : 'rgba(255, 255, 255, 0.3)',
                        mr: 2
                      }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: tool.active ? 'white' : 'rgba(255, 255, 255, 0.6)',
                          flex: 1
                        }}
                      >
                        {tool.name}
                      </Typography>
                      <Switch
                        checked={tool.active}
                        size="small"
                        sx={{
                          '& .MuiSwitch-track': {
                            backgroundColor: tool.active ? `${tool.color}50` : 'rgba(255, 255, 255, 0.2)'
                          },
                          '& .MuiSwitch-thumb': {
                            backgroundColor: tool.active ? tool.color : 'rgba(255, 255, 255, 0.5)'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Panel - Waveform and Playback */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Waveform Display */}
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                mb: 3
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                      Waveform Visualization
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={processing ? "Processing..." : "Ready"} 
                        size="small"
                        sx={{ 
                          backgroundColor: processing ? '#f59e0b' : '#10b981',
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    </Box>
                  </Box>

                  <Box sx={{ 
                    height: 200, 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    background: 'rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    mb: 3
                  }}>
                    <canvas
                      ref={canvasRef}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                      }}
                    />
                  </Box>

                  {/* Processing Progress */}
                  <AnimatePresence>
                    {processing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: 'white' }}>
                              Processing Audio...
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                              {Math.round(progress)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                                borderRadius: 4,
                              }
                            }}
                          />
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Playback Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setIsPlaying(!isPlaying)}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: isPlaying 
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : 'linear-gradient(135deg, #10b981, #059669)',
                        minWidth: 'auto',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      {isPlaying ? <Pause sx={{ fontSize: 24 }} /> : <PlayArrow sx={{ fontSize: 24 }} />}
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={handleProcess}
                      disabled={processing}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        '&:hover': {
                          borderColor: '#2563eb',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        }
                      }}
                    >
                      Process Audio
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderColor: '#10b981',
                        color: '#10b981',
                        '&:hover': {
                          borderColor: '#059669',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        }
                      }}
                    >
                      Export
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProcessingStudioPage