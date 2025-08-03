import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Paper,
  IconButton
} from '@mui/material'
import {
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  PlayArrow,
  Pause,
  VolumeUp,
  Equalizer,
  GraphicEq
} from '@mui/icons-material'
import Prefooter from '../components/Prefooter'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'AI-powered vocal separation',
    longDescription: 'Remove vocals from any song using advanced machine learning algorithms',
    icon: VolumeOff,
    path: '/vocal-remover',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    progress: 65
  },
  {
    title: 'Pitch + Tempo',
    description: 'Professional audio adjustment',
    longDescription: 'Change pitch and tempo independently without quality loss',
    icon: Tune,
    path: '/pitch-tempo',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    progress: 78
  },
  {
    title: 'Noise Reducer',
    description: 'Crystal clear audio enhancement',
    longDescription: 'Remove background noise and improve audio clarity instantly',
    icon: MusicNote,
    path: '/noise-reduction',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    progress: 45
  },
  {
    title: 'Format Converter',
    description: 'Universal audio conversion',
    longDescription: 'Convert between all popular audio formats with perfect quality',
    icon: SwapHoriz,
    path: '/format-converter',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    progress: 90
  }
]

function NewHomePage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Animated Wave Background */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 320'%3E%3Cpath fill='%23ffffff10' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        opacity: 0.6
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
            {/* Floating Icons */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: 20,
                left: '10%',
                zIndex: 0
              }}
            >
              <GraphicEq sx={{ fontSize: 40, color: 'rgba(74, 222, 128, 0.3)' }} />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                position: 'absolute',
                top: 50,
                right: '15%',
                zIndex: 0
              }}
            >
              <VolumeUp sx={{ fontSize: 35, color: 'rgba(59, 130, 246, 0.3)' }} />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{
                position: 'absolute',
                bottom: 100,
                left: '20%',
                zIndex: 0
              }}
            >
              <Equalizer sx={{ fontSize: 30, color: 'rgba(139, 92, 246, 0.3)' }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography 
                variant="h1" 
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                  fontWeight: 300,
                  color: 'white',
                  lineHeight: 1.1,
                  mb: 4,
                  position: 'relative',
                  zIndex: 1,
                  background: 'linear-gradient(45deg, #ffffff 30%, #4ade80 70%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Remove vocals.
                <br />
                Change pitch.
                <br />
                Convert formats.
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                component={Link}
                to="/tools"
                variant="contained"
                size="large"
                className="enhanced-button"
                sx={{
                  background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  px: 6,
                  py: 2,
                  borderRadius: '30px',
                  boxShadow: '0 8px 32px rgba(74, 222, 128, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #22c55e, #16a34a)',
                    boxShadow: '0 12px 40px rgba(74, 222, 128, 0.4)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                GET STARTED
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Audio Tools Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Grid item xs={12} sm={6} lg={3} key={tool.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: 30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Paper
                    component={Link}
                    to={tool.path}
                    sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.8)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      p: 3,
                      height: '380px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.9)',
                        border: `1px solid ${tool.color}`,
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${tool.color}20`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: tool.gradient,
                        borderRadius: '20px 20px 0 0'
                      }
                    }}
                  >
                    {/* Header */}
                    <Box sx={{ mb: 3, position: 'relative' }}>
                      <Box sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '16px',
                        background: tool.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        boxShadow: `0 8px 24px ${tool.color}30`,
                        position: 'relative'
                      }}>
                        <Icon sx={{ fontSize: 30, color: 'white' }} />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          style={{
                            position: 'absolute',
                            width: '70px',
                            height: '70px',
                            border: `2px solid ${tool.color}30`,
                            borderTop: `2px solid ${tool.color}`,
                            borderRadius: '50%',
                            top: -5,
                            left: -5
                          }}
                        />
                      </Box>
                      
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {tool.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        {tool.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {tool.longDescription}
                      </Typography>
                    </Box>

                    {/* Enhanced Waveform Visualization */}
                    <Box sx={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Box sx={{
                        width: '100%',
                        height: '80px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {/* Animated waveform */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          height: '50px',
                          gap: '1px'
                        }}>
                          {Array.from({ length: 35 }, (_, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 5 }}
                              animate={{ 
                                height: [5, Math.random() * 40 + 10, 5],
                                backgroundColor: [tool.color, `${tool.color}80`, tool.color]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                              }}
                              style={{
                                width: '3px',
                                borderRadius: '2px',
                                opacity: 0.9
                              }}
                            />
                          ))}
                        </Box>
                        
                        {/* Play/Pause button */}
                        <IconButton sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 32,
                          height: 32,
                          backgroundColor: tool.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: tool.color,
                            filter: 'brightness(1.1)',
                            transform: 'translateY(-50%) scale(1.1)',
                          },
                          transition: 'all 0.2s ease'
                        }}>
                          <PlayArrow sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Progress and Controls */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          00:00
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          03:24
                        </Typography>
                      </Box>
                      <Box sx={{
                        height: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '2px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: `${tool.progress}%` }}
                          transition={{ duration: 2, delay: index * 0.3 }}
                          style={{
                            height: '100%',
                            background: tool.gradient,
                            borderRadius: '2px'
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Enhanced Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: tool.gradient,
                          color: 'white',
                          fontWeight: 600,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontSize: '1rem',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            background: tool.gradient,
                            filter: 'brightness(1.1)',
                            boxShadow: `0 8px 24px ${tool.color}40`,
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transform: 'rotate(45deg)',
                            transition: 'all 0.5s ease',
                            opacity: 0
                          },
                          '&:hover::before': {
                            animation: 'shine 0.5s ease-in-out'
                          }
                        }}
                      >
                        Open Tool
                      </Button>
                    </motion.div>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* About Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 300, 
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            About
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Advanced audio processing tools powered by cutting-edge AI algorithms. Remove vocals, adjust pitch and tempo, convert formats, and reduce noise with professional-grade quality. Perfect for musicians, podcasters, and audio enthusiasts.
          </Typography>
        </Box>

        {/* Prefooter */}
        <Prefooter />
      </Container>
    </Box>
  )
}

export default NewHomePage