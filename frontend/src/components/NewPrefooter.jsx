import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Avatar
} from '@mui/material'
import {
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  GraphicEq
} from '@mui/icons-material'

const features = [
  {
    id: '1',
    title: 'Vocal Remover (AI-Powered)',
    subtitle: 'Advanced Source Separation',
    icon: VolumeOff,
    color: '#8b5cf6',
    bgColor: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    description: 'Remove vocals from any song using cutting-edge AI technology'
  },
  {
    id: '2', 
    title: 'Pitch + Tempo Changer',
    subtitle: 'Independent Audio Control',
    icon: Tune,
    color: '#f59e0b',
    bgColor: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    description: 'Adjust pitch and tempo independently without quality loss'
  },
  {
    id: '4',
    title: 'Audio Format Converter',
    subtitle: 'Universal Compatibility',
    icon: SwapHoriz,
    color: '#06b6d4',
    bgColor: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
    description: 'Convert between all major audio formats instantly'
  },
  {
    id: '0',
    title: 'Audio Editor (Cut/Join)',
    subtitle: 'Precision Editing Tools',
    icon: ContentCut,
    color: '#f97316',
    bgColor: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
    description: 'Cut, trim, and merge audio files with visual waveforms'
  },
  {
    id: '3',
    title: 'Noise Reduction Suite',
    subtitle: 'Crystal Clear Audio',
    icon: MusicNote,
    color: '#10b981',
    bgColor: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    description: 'Remove background noise and enhance audio clarity'
  },
  {
    id: '6',
    title: 'Audio Analyzer Pro',
    subtitle: 'Professional Visualization',
    icon: GraphicEq,
    color: '#ec4899',
    bgColor: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    description: 'Analyze audio with real-time waveforms and spectrum'
  }
]

function NewPrefooter() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              Audio Processing Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}
            >
              Professional-grade audio tools powered by AI and advanced signal processing algorithms
            </Typography>
          </Box>

          {/* Tools Sections Grid */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                Tools Sections
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563eb', fontSize: '0.8rem' }}>9</Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#ef4444', fontSize: '0.8rem' }}>⚡</Avatar>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Grid item xs={12} sm={6} md={4} key={feature.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -4,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      <Card
                        sx={{
                          height: 200,
                          background: feature.bgColor,
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          borderRadius: '16px',
                          position: 'relative',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          {/* Number Badge */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 16,
                              left: 16,
                              width: 32,
                              height: 32,
                              borderRadius: '8px',
                              background: 'rgba(0, 0, 0, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              color: feature.color
                            }}
                          >
                            {feature.id}
                          </Box>

                          {/* Icon */}
                          <Box sx={{ mt: 6, mb: 2 }}>
                            <Icon 
                              sx={{ 
                                fontSize: 40, 
                                color: feature.color,
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }} 
                            />
                          </Box>

                          {/* Content */}
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            sx={{ 
                              color: '#1f2937',
                              mb: 0.5,
                              fontSize: '1rem'
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#6b7280',
                              fontSize: '0.85rem',
                              lineHeight: 1.4
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                p: 4,
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  opacity: 0.3
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                  Advanced Audio Processing
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                  Transform your audio files with professional-grade tools and AI-powered features
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Explore All Tools
                </Button>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

export default NewPrefooter