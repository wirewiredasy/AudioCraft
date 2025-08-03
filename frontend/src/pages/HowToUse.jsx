import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Grid,
  Avatar
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  NoiseControlOff,
  PlayArrow,
  ArrowForward
} from '@mui/icons-material'

const guides = [
  {
    title: 'Vocal Remover Guide',
    description: 'AI-powered vocal separation technology',
    longDescription: 'Learn to remove vocals from any song using advanced AI source separation. Perfect for creating karaoke tracks or instrumental versions.',
    icon: VolumeOff,
    path: '/how-to-use-vocal-remover',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  {
    title: 'Pitch & Tempo Guide',
    description: 'Professional audio adjustment tools',
    longDescription: 'Master independent pitch shifting and tempo adjustment with professional controls for perfect audio manipulation.',
    icon: Tune,
    path: '/how-to-use-pitch-tempo',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
  },
  {
    title: 'Format Converter Guide',
    description: 'Universal audio format conversion',
    longDescription: 'Convert between all popular audio formats with quality optimization and batch processing capabilities.',
    icon: SwapHoriz,
    path: '/how-to-use-format-converter',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  {
    title: 'Audio Editor Guide',
    description: 'Visual waveform editing tools',
    longDescription: 'Professional audio editing with visual waveforms for precise cutting, trimming, and joining operations.',
    icon: ContentCut,
    path: '/how-to-use-audio-editor',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    title: 'Noise Reduction Guide',
    description: 'Advanced noise removal algorithms',
    longDescription: 'Remove background noise and enhance audio clarity using professional-grade noise reduction techniques.',
    icon: NoiseControlOff,
    path: '/how-to-use-noise-reduction',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  }
]

function HowToUse() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Audio Tools Usage Guides
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
          >
            Comprehensive step-by-step guides for mastering our professional audio processing tools.
            Learn best practices, tips, and advanced techniques for optimal results.
          </Typography>
        </Box>

        {/* Guide Cards */}
        <Grid container spacing={4}>
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <Grid item xs={12} md={6} lg={4} key={guide.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Card
                    component={Link}
                    to={guide.path}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '20px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${guide.color}30`,
                        transform: 'translateY(-4px)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: guide.gradient,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            background: guide.gradient,
                            mr: 2
                          }}
                        >
                          <Icon sx={{ fontSize: 28 }} />
                        </Avatar>
                        <Box>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            color="text.primary"
                            sx={{ mb: 0.5 }}
                          >
                            {guide.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                          >
                            {guide.description}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ flex: 1, mb: 3, lineHeight: 1.6 }}
                      >
                        {guide.longDescription}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          sx={{ 
                            borderColor: guide.color,
                            color: guide.color,
                            borderRadius: '12px',
                            '&:hover': {
                              backgroundColor: `${guide.color}10`,
                              borderColor: guide.color,
                            }
                          }}
                        >
                          Read Guide
                        </Button>
                        <ArrowForward 
                          sx={{ 
                            color: guide.color, 
                            fontSize: 24,
                            transition: 'transform 0.3s ease',
                          }} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Quick Access Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Quick Access
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Jump directly to any tool or explore our comprehensive documentation
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                borderRadius: '12px'
              }}
            >
              Back to Tools
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default HowToUse