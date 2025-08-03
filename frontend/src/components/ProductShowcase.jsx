import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Avatar
} from '@mui/material'
import {
  VolumeOff,
  PlayArrow,
  Settings,
  CheckCircle
} from '@mui/icons-material'

function ProductShowcase() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
      py: 8
    }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 8, alignItems: 'center' }}>
          
          {/* Left Side - Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Box sx={{ position: 'relative', perspective: '1000px' }}>
              <motion.div
                animate={{
                  rotateY: [0, -2, 0],
                  rotateX: [0, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Main Device */}
                <Box
                  sx={{
                    width: { xs: 320, md: 400, lg: 480 },
                    height: { xs: 240, md: 300, lg: 360 },
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    borderRadius: '20px',
                    transform: 'rotateX(5deg) rotateY(-8deg)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Screen Content */}
                  <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Top Navigation Bar */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mb: 3,
                      pb: 2,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                          <VolumeOff sx={{ fontSize: 18 }} />
                        </Avatar>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                          Vocal Remover Pro
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#28ca42' }} />
                      </Box>
                    </Box>

                    {/* Main Content Area */}
                    <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
                      {/* Left Panel */}
                      <Box sx={{ width: 80, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {['🎵', '⚙️', '📊', '🔧'].map((icon, i) => (
                          <Box 
                            key={i}
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              background: i === 0 ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.15)',
                                transform: 'scale(1.05)',
                              }
                            }}
                          >
                            {icon}
                          </Box>
                        ))}
                      </Box>

                      {/* Main Processing Area */}
                      <Box sx={{ flex: 1, position: 'relative' }}>
                        {/* Processing Status */}
                        <Box sx={{ 
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '8px',
                          p: 2,
                          mb: 2
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                              Processing Complete
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#d1fae5', fontSize: '0.75rem' }}>
                            Vocals successfully removed using AI separation
                          </Typography>
                        </Box>

                        {/* Audio Waveform Visualization */}
                        <Box sx={{ 
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '8px',
                          p: 2,
                          flex: 1,
                          position: 'relative',
                          minHeight: 100
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 60 }}>
                            {Array.from({ length: 32 }).map((_, i) => (
                              <motion.div
                                key={i}
                                style={{
                                  width: 3,
                                  background: `linear-gradient(to top, #667eea, #4facfe)`,
                                  borderRadius: '2px',
                                  originY: 1,
                                }}
                                animate={{
                                  height: [
                                    Math.random() * 40 + 10,
                                    Math.random() * 60 + 5,
                                    Math.random() * 30 + 15
                                  ]
                                }}
                                transition={{
                                  duration: 2 + Math.random() * 2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: i * 0.1
                                }}
                              />
                            ))}
                          </Box>
                          
                          {/* Playback Controls */}
                          <Box sx={{ 
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            right: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                          }}>
                            <Box sx={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}>
                              <PlayArrow sx={{ color: 'white', fontSize: 16 }} />
                            </Box>
                            <Box sx={{ flex: 1, height: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 1 }}>
                              <motion.div
                                style={{
                                  height: '100%',
                                  background: 'linear-gradient(90deg, #00f2fe, #4facfe)',
                                  borderRadius: 1,
                                }}
                                animate={{ width: ['25%', '75%', '25%'] }}
                                transition={{ duration: 4, repeat: Infinity }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Screen Reflection */}
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

              {/* Floating Hand with Microphone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  position: 'absolute',
                  right: -60,
                  top: '20%',
                  zIndex: 10
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 160,
                      background: 'linear-gradient(145deg, #f0f0f0, #e0e0e0)',
                      borderRadius: '60px 60px 40px 40px',
                      position: 'relative',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {/* Microphone in hand */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 40,
                        height: 80,
                        background: 'linear-gradient(145deg, #c0c0c0, #a0a0a0)',
                        borderRadius: '20px 20px 8px 8px',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 5,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 30,
                          height: 30,
                          background: 'radial-gradient(circle, #666, #333)',
                          borderRadius: '50%',
                        }
                      }}
                    />
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Box>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: '#0f172a',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
                }}
              >
                Professional Audio Processing
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6, fontSize: '1.1rem' }}
              >
                Transform your audio files with cutting-edge AI technology. Remove vocals, 
                adjust pitch and tempo, convert formats, and enhance quality with professional-grade tools.
              </Typography>

              {/* Feature Pills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {[
                  { label: 'AI-Powered', color: '#667eea' },
                  { label: 'High Quality', color: '#10b981' },
                  { label: 'Fast Processing', color: '#f59e0b' },
                  { label: 'Multiple Formats', color: '#ef4444' }
                ].map((pill) => (
                  <Box
                    key={pill.label}
                    sx={{
                      px: 3,
                      py: 1,
                      background: `${pill.color}15`,
                      border: `1px solid ${pill.color}30`,
                      borderRadius: '20px',
                      color: pill.color,
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    {pill.label}
                  </Box>
                ))}
              </Box>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    borderRadius: '12px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Try Tools Now
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
                    borderColor: '#64748b',
                    color: '#64748b',
                    borderRadius: '12px',
                    '&:hover': {
                      borderColor: '#475569',
                      color: '#475569',
                      background: 'rgba(100, 116, 139, 0.05)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default ProductShowcase