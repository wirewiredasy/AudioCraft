import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Container } from '@mui/material'

function HeroSection() {
  const canvasRef = useRef(null)

  // Animated waveform effect
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

    // Waveform animation
    let animationId
    let time = 0

    const drawWaveform = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      const centerY = canvas.offsetHeight / 2
      const barWidth = 3
      const barSpacing = 5
      const numBars = Math.floor(canvas.offsetWidth / (barWidth + barSpacing))

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barSpacing)
        const amplitude = Math.sin(time * 0.01 + i * 0.1) * 30 + Math.sin(time * 0.005 + i * 0.05) * 20
        const height = Math.abs(amplitude)
        
        // Create gradient colors (green to blue to purple)
        const hue = (i / numBars) * 240 + 120 // 120 (green) to 360 (purple)
        const saturation = 70 + Math.sin(time * 0.01 + i * 0.1) * 20
        
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, 60%)`
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #4facfe 75%, #00f2fe 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: 'white',
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 8,
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                    fontWeight: 900,
                    color: 'rgba(20, 20, 20, 0.9)',
                    mb: 1,
                    textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Odoremover
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(20, 20, 20, 0.7)',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    mb: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  ADVIA EDITING TOOLS
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(20, 20, 20, 0.6)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: 500,
                    mx: { xs: 'auto', lg: 0 },
                  }}
                >
                  Professional audio processing tools powered by AI. Remove vocals, 
                  adjust pitch, convert formats, and enhance your audio with cutting-edge technology.
                </Typography>
              </motion.div>
            </Box>
          </motion.div>

          {/* Right side - Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >
            <Box
              sx={{
                perspective: '1000px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{
                  rotateX: [0, 2, 0],
                  rotateY: [0, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, md: 450, lg: 500 },
                    height: { xs: 200, md: 300, lg: 350 },
                    background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
                    borderRadius: '20px',
                    transform: 'rotateX(10deg) rotateY(-5deg)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Screen content */}
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Top bar */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        pb: 1,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 0.5,
                          mr: 2,
                        }}
                      >
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#28ca42' }} />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem' }}
                      >
                        OdoRemover - Audio Editor
                      </Typography>
                    </Box>

                    {/* Sidebar */}
                    <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                      <Box
                        sx={{
                          width: 60,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                        }}
                      >
                        {[
                          { icon: '🎵', active: true },
                          { icon: '🎤' },
                          { icon: '⚡' },
                          { icon: '🔄' },
                          { icon: '✂️' },
                          { icon: '🔇' },
                        ].map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '8px',
                              background: item.active
                                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                                : 'rgba(255, 255, 255, 0.05)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {item.icon}
                          </Box>
                        ))}
                      </Box>

                      {/* Main content area with waveform */}
                      <Box sx={{ flex: 1, position: 'relative' }}>
                        <canvas
                          ref={canvasRef}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            background: 'rgba(0, 0, 0, 0.3)',
                          }}
                        />
                        
                        {/* Playback controls overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            right: 10,
                            height: 40,
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            px: 2,
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.7rem',
                            }}
                          >
                            ▶
                          </Box>
                          <Box
                            sx={{
                              flex: 1,
                              height: 2,
                              background: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: 1,
                              position: 'relative',
                            }}
                          >
                            <motion.div
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                background: 'linear-gradient(90deg, #00f2fe, #4facfe)',
                                borderRadius: 1,
                              }}
                              animate={{ width: ['20%', '60%', '20%'] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Screen reflection effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                      borderRadius: '20px',
                      pointerEvents: 'none',
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Floating elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 60,
          height: 60,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 40,
          height: 40,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
          borderRadius: '20%',
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          y: [0, 15, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </Box>
  )
}

export default HeroSection