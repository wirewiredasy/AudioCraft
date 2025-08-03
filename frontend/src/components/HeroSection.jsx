import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Container, Button } from '@mui/material'
import { PlayArrow, VolumeOff, Tune } from '@mui/icons-material'

function HeroSection() {
  const canvasRef = useRef(null)

  // Enhanced realistic wave animation effect
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

    // More realistic wave animation
    let animationId
    let time = 0

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      const centerY = canvas.offsetHeight / 2
      const barWidth = 6  // Larger bars
      const barSpacing = 3
      const numBars = Math.floor(canvas.offsetWidth / (barWidth + barSpacing))

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barSpacing)
        
        // More realistic wave patterns with multiple frequencies
        const frequency1 = Math.sin(time * 0.02 + i * 0.2) * 80
        const frequency2 = Math.sin(time * 0.015 + i * 0.15) * 50
        const frequency3 = Math.sin(time * 0.008 + i * 0.1) * 30
        const amplitude = frequency1 + frequency2 + frequency3
        const height = Math.abs(amplitude) + 20 // Minimum height for visibility
        
        // Beautiful cyan to blue gradient colors
        const progress = i / numBars
        const hue = 190 + progress * 50 // Cyan (190) to blue (240)
        const saturation = 85 + Math.sin(time * 0.01 + i * 0.08) * 15
        const lightness = 55 + Math.sin(time * 0.012 + i * 0.1) * 15
        
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
        ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`
        ctx.shadowBlur = 4
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
  }, [])

  return (
    <Box
      sx={{
        minHeight: '60vh', // Smaller hero section
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated geometric patterns */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
        }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
            minHeight: '50vh', // Smaller minimum height
          }}
        >
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Box sx={{ color: 'white', mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                Professional Audio Processing
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400,
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                }}
              >
                Remove vocals, adjust pitch & tempo, convert formats, and enhance your audio with AI-powered tools
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 25px rgba(6, 182, 212, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #0891b2, #2563eb)',
                        boxShadow: '0 12px 35px rgba(6, 182, 212, 0.6)',
                      },
                    }}
                  >
                    Try Now
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<VolumeOff />}
                    sx={{
                      borderColor: '#06b6d4',
                      color: '#06b6d4',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#0891b2',
                        background: 'rgba(6, 182, 212, 0.1)',
                      },
                    }}
                  >
                    Vocal Remover
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

          {/* Right side - Enhanced Wave Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '300px', md: '400px' },
              }}
            >
              {/* Large Wave Canvas */}
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '16px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)',
                }}
              />
              
              {/* Overlay controls */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 2,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
                    }}
                  >
                    <PlayArrow sx={{ color: 'white', fontSize: '1.5rem' }} />
                  </Box>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Tune sx={{ color: '#06b6d4', fontSize: '1.5rem' }} />
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection