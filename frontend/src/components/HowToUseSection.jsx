import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Chip
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  PlayArrow,
  ArrowBack,
  ArrowForward,
  Settings
} from '@mui/icons-material'

function HowToUseSection() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #e0d6e8 0%, #d1c4dd 50%, #c5b8d0 100%)',
      py: 8,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 8, alignItems: 'center' }}>
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Box>
              <Typography 
                variant="h2" 
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: '#2d1b40',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
                  lineHeight: 1.1
                }}
              >
                Audio Tool
                <br />
                Usage Guide
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#4a3858', 
                  mb: 4, 
                  lineHeight: 1.6, 
                  fontSize: '1.1rem',
                  maxWidth: 500
                }}
              >
                Learn how to use our advanced audio processing tools with 
                step-by-step guides and professional tips for best results.
              </Typography>

              {/* Feature Tags */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #667eea, #764ba2)' 
                  }} />
                  <Typography variant="body2" sx={{ color: '#4a3858', fontWeight: 600 }}>
                    STEP-BY-STEP
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6b5b73', mx: 1 }}>+</Typography>
                <Typography variant="body2" sx={{ color: '#4a3858', fontWeight: 600 }}>
                  PROFESSIONAL GUIDES
                </Typography>
              </Box>

              {/* Tool Features */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    background: 'rgba(45, 27, 64, 0.1)', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PlayArrow sx={{ color: '#2d1b40', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#2d1b40' }}>
                      Easy to Follow
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b5b73' }}>
                      Clear instructions with visual examples and professional techniques
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ ml: 6, pl: 2, borderLeft: '2px solid rgba(45, 27, 64, 0.1)' }}>
                  <Typography variant="body2" sx={{ color: '#6b5b73', lineHeight: 1.6, mb: 2 }}>
                    Each tool comes with detailed guides covering setup, usage, 
                    advanced features, and troubleshooting tips.
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b5b73', lineHeight: 1.6 }}>
                    Perfect for beginners and professionals who want to get 
                    the best results from our audio processing suite.
                  </Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#2d1b40',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  All Guides
                </Button>
                <Button
                  sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#2d1b40',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Quick Start
                </Button>
              </Box>

              {/* Quality Tags */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="caption" sx={{ color: '#6b5b73', mb: 1, display: 'block' }}>
                  Independent tutorials with
                </Typography>
                <Typography variant="body2" sx={{ color: '#4a3858', fontWeight: 600 }}>
                  professional quality guides
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Right Side - Device with Hand */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              
              {/* Navigation Arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  left: -40, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.05)',
                    }
                  }}>
                    <ArrowBack sx={{ color: '#2d1b40', fontSize: 24 }} />
                  </Box>
                </Box>

                <Box sx={{ 
                  position: 'absolute', 
                  right: -40, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'scale(1.05)',
                    }
                  }}>
                    <ArrowForward sx={{ color: '#2d1b40', fontSize: 24 }} />
                  </Box>
                </Box>
              </motion.div>

              {/* Main Device in Hand */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  {/* Hand holding device */}
                  <Box
                    sx={{
                      width: { xs: 300, md: 350, lg: 400 },
                      height: { xs: 400, md: 450, lg: 500 },
                      position: 'relative',
                    }}
                  >
                    {/* Hand */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        height: 300,
                        background: 'linear-gradient(145deg, #d4a574, #c49660)',
                        borderRadius: '100px 100px 50px 50px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      }}
                    />

                    {/* Microphone Device */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 80,
                        height: 200,
                        background: 'linear-gradient(145deg, #e8e8e8, #d0d0d0)',
                        borderRadius: '40px 40px 20px 20px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Microphone Mesh */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 60,
                          height: 60,
                          background: 'radial-gradient(circle, #888 1px, transparent 1px)',
                          backgroundSize: '6px 6px',
                          borderRadius: '50%',
                          border: '2px solid #666',
                        }}
                      />

                      {/* Control Buttons */}
                      <Box sx={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)' }}>
                        <Box sx={{
                          width: 35,
                          height: 35,
                          borderRadius: '50%',
                          background: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
                          border: '2px solid #bbb',
                          mb: 1,
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        }} />
                        <Box sx={{
                          width: 35,
                          height: 35,
                          borderRadius: '50%',
                          background: 'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
                          border: '2px solid #bbb',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        }} />
                      </Box>

                      {/* Brand Label */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#666',
                        fontSize: '0.6rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px'
                      }}>
                        ODO
                      </Box>
                    </Box>
                  </Box>

                  {/* Info Labels */}
                  <Box sx={{ position: 'absolute', top: 60, right: -80 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#6b5b73', 
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      Pitch
                    </Typography>
                  </Box>

                  <Box sx={{ position: 'absolute', top: 140, right: -100 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#6b5b73', 
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      Quality
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: '#6b5b73', 
                      fontSize: '0.75rem',
                      display: 'block'
                    }}>
                      control
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default HowToUseSection