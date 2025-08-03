import React, { useEffect, useRef, useState } from 'react'
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
  Chip
} from '@mui/material'
import {
  Mic,
  VolumeUp,
  PlayArrow,
  Stop,
  Settings,
  TrendingUp,
  Psychology,
  RecordVoiceOver
} from '@mui/icons-material'

function VoiceAIStylePage() {
  const [isListening, setIsListening] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const canvasRef = useRef(null)

  // Animated audio visualization
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
      const barWidth = 4
      const barSpacing = 6
      const numBars = Math.floor(canvas.offsetWidth / (barWidth + barSpacing))

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barSpacing)
        const baseAmplitude = isListening ? 
          Math.sin(time * 0.02 + i * 0.2) * 40 + Math.sin(time * 0.01 + i * 0.1) * 30 :
          Math.sin(time * 0.005 + i * 0.3) * 10
        
        const height = Math.abs(baseAmplitude) * (1 + audioLevel * 2)
        
        // Create gradient based on position
        const gradient = ctx.createLinearGradient(0, centerY - height/2, 0, centerY + height/2)
        gradient.addColorStop(0, `hsl(${280 + i * 3}, 70%, 60%)`)
        gradient.addColorStop(0.5, `hsl(${240 + i * 2}, 80%, 70%)`)
        gradient.addColorStop(1, `hsl(${200 + i * 1}, 60%, 50%)`)
        
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
  }, [isListening, audioLevel])

  // Simulate audio level changes
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random())
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isListening])

  const features = [
    {
      icon: Psychology,
      title: 'AI Voice Processing',
      description: 'Advanced neural networks for real-time audio analysis',
      color: '#8b5cf6'
    },
    {
      icon: RecordVoiceOver,
      title: 'Voice Synthesis',
      description: 'Natural-sounding speech generation with emotion',
      color: '#3b82f6'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Monitor voice quality and processing metrics',
      color: '#10b981'
    }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                fontWeight: 900,
                color: 'white',
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff, #e0e7ff, #c7d2fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
              }}
            >
              Voice AI Revolution
            </Typography>
            
            <Typography 
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 6,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Transform your audio with cutting-edge artificial intelligence. 
              Real-time voice processing, synthesis, and analysis powered by advanced neural networks.
            </Typography>

            {/* Interactive Voice Control */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: 4,
              mb: 8
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setIsListening(!isListening)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: isListening 
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                      : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    boxShadow: isListening 
                      ? '0 0 40px rgba(239, 68, 68, 0.6)'
                      : '0 0 40px rgba(139, 92, 246, 0.6)',
                    '&:hover': {
                      boxShadow: isListening 
                        ? '0 0 60px rgba(239, 68, 68, 0.8)'
                        : '0 0 60px rgba(139, 92, 246, 0.8)',
                    }
                  }}
                >
                  {isListening ? <Stop sx={{ fontSize: 32 }} /> : <Mic sx={{ fontSize: 32 }} />}
                </Button>
              </motion.div>

              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 600 }}>
                      Listening...
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            {/* Audio Waveform Visualization */}
            <Box sx={{ 
              height: 120, 
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 4,
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
              
              {/* Status Overlay */}
              <Box sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: isListening ? '#10b981' : '#6b7280',
                  animation: isListening ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  }
                }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {isListening ? 'Active' : 'Standby'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Grid item xs={12} md={4} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: `1px solid ${feature.color}`,
                      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${feature.color}30`,
                    }
                  }}>
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar sx={{
                        width: 80,
                        height: 80,
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                        mb: 3,
                        mx: 'auto'
                      }}>
                        <Icon sx={{ fontSize: 40 }} />
                      </Avatar>
                      
                      <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
                        {feature.title}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            textAlign: 'center'
          }}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
              Experience the Future of Voice
            </Typography>
            
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, maxWidth: 600, mx: 'auto' }}>
              Join thousands of creators, developers, and businesses using our AI-powered voice technology
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '12px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                  }
                }}
              >
                Start Processing
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<Settings />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                Advanced Settings
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default VoiceAIStylePage