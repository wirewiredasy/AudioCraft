import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useScrollAnimation, scrollVariants, staggerVariants } from '../hooks/useScrollAnimation'
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

import HowToUseSection from '../components/HowToUseSection'

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



      {/* VoiceAI Style Features Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 100%)',
          position: 'relative',
          overflow: 'hidden'
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
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
                borderRadius: '50%',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </Box>

        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Audio Processing Features
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Professional-grade audio tools powered by AI and advanced signal processing algorithms
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  id: '1',
                  title: 'Vocal Remover (AI-Powered)',
                  description: 'Remove vocals from any song using cutting-edge AI technology',
                  icon: VolumeOff,
                  color: '#8b5cf6',
                  path: '/vocal-remover'
                },
                {
                  id: '2',
                  title: 'Pitch + Tempo Changer',
                  description: 'Adjust pitch and tempo independently without quality loss',
                  icon: Tune,
                  color: '#f59e0b',
                  path: '/pitch-tempo'
                },
                {
                  id: '4',
                  title: 'Audio Format Converter',
                  description: 'Convert between all major audio formats instantly',
                  icon: SwapHoriz,
                  color: '#06b6d4',
                  path: '/format-converter'
                },
                {
                  id: '0',
                  title: 'Audio Editor (Cut/Join)',
                  description: 'Cut, trim, and merge audio files with visual waveforms',
                  icon: ContentCut,
                  color: '#f97316',
                  path: '/audio-editor'
                },
                {
                  id: '3',
                  title: 'Noise Reduction Suite',
                  description: 'Remove background noise and enhance audio clarity',
                  icon: MusicNote,
                  color: '#10b981',
                  path: '/noise-reduction'
                },
                {
                  id: '6',
                  title: 'Audio Analyzer Pro',
                  description: 'Analyze audio with real-time waveforms and spectrum',
                  icon: GraphicEq,
                  color: '#ec4899',
                  path: '/tools'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Grid item xs={12} md={6} lg={4} key={feature.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '20px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: `1px solid ${feature.color}40`,
                            boxShadow: `0 20px 40px ${feature.color}20`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 3,
                            }}
                          >
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 800,
                                color: feature.color,
                                mr: 2,
                                fontSize: '2rem',
                              }}
                            >
                              {feature.id}
                            </Typography>
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '16px',
                                background: `linear-gradient(45deg, ${feature.color}20, ${feature.color}40)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${feature.color}30`,
                              }}
                            >
                              <IconComponent sx={{ fontSize: 28, color: feature.color }} />
                            </Box>
                          </Box>
                          
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'white',
                              mb: 2,
                              lineHeight: 1.3,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              lineHeight: 1.6,
                              mb: 3,
                            }}
                          >
                            {feature.description}
                          </Typography>

                          <Button
                            variant="outlined"
                            component={Link}
                            to={feature.path}
                            fullWidth
                            sx={{
                              borderColor: feature.color,
                              color: feature.color,
                              fontWeight: 600,
                              py: 1.5,
                              borderRadius: '12px',
                              '&:hover': {
                                background: `${feature.color}15`,
                                borderColor: feature.color,
                                transform: 'translateY(-2px)',
                              },
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

      <HowToUseSection />
    </Box>
  )
}

export default NewHomePage