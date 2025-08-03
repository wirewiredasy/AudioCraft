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
import HeroSection from '../components/HeroSection'
import NewPrefooter from '../components/NewPrefooter'

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
  },
  {
    title: 'Audio Editor',
    description: 'Cut and join audio files', 
    longDescription: 'Precisely cut, trim, and join audio files with visual waveform editing',
    icon: ContentCut,
    path: '/audio-editor',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    progress: 82
  }
]

function NewHomePage() {
  return (
    <Box>
      {/* Hero Section - Exact clone of uploaded image */}
      <HeroSection />

      {/* Tools Section */}
      <Box sx={{ 
        background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 8
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Professional Audio Tools
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Everything you need to process, enhance, and transform your audio files
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <Grid item xs={12} sm={6} lg={4} key={tool.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.03,
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <Card
                        component={Link}
                        to={tool.path}
                        sx={{
                          height: '100%',
                          textDecoration: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            boxShadow: `0 10px 30px ${tool.color}30`,
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: tool.gradient,
                          }
                        }}
                      >
                        <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '12px',
                                background: tool.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2
                              }}
                            >
                              <Icon sx={{ fontSize: 28, color: 'white' }} />
                            </Box>
                            <Box>
                              <Typography variant="h6" fontWeight="bold" color="text.primary">
                                {tool.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tool.description}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                            {tool.longDescription}
                          </Typography>

                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{ 
                              mt: 3,
                              borderColor: tool.color,
                              color: tool.color,
                              '&:hover': {
                                backgroundColor: `${tool.color}10`,
                                borderColor: tool.color,
                              }
                            }}
                          >
                            Try Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <NewPrefooter />
    </Box>
  )
}

export default NewHomePage