import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Avatar,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material'
import {
  AutoAwesome,
  Speed,
  HighQuality,
  Security,
  Cloud,
  TrendingUp,
  Psychology,
  VolumeUp,
  Mic
} from '@mui/icons-material'

function AIFeaturesPage() {
  const aiFeatures = [
    {
      icon: Psychology,
      title: 'Neural Voice Processing',
      description: 'Advanced deep learning models for superior audio quality',
      progress: 95,
      color: '#8b5cf6',
      stats: '99.7% Accuracy'
    },
    {
      icon: AutoAwesome,
      title: 'Smart Enhancement',
      description: 'AI-powered noise reduction and audio optimization',
      progress: 92,
      color: '#3b82f6',
      stats: '40dB+ Noise Reduction'
    },
    {
      icon: Speed,
      title: 'Real-time Processing',
      description: 'Lightning-fast audio processing with minimal latency',
      progress: 98,
      color: '#10b981',
      stats: '<50ms Latency'
    },
    {
      icon: HighQuality,
      title: 'Lossless Quality',
      description: 'Maintain original audio fidelity through all transformations',
      progress: 96,
      color: '#f59e0b',
      stats: '48kHz/24-bit'
    },
    {
      icon: Security,
      title: 'Privacy First',
      description: 'End-to-end encryption with local processing options',
      progress: 100,
      color: '#ef4444',
      stats: 'Zero Data Storage'
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamless cloud processing with offline fallback',
      progress: 89,
      color: '#06b6d4',
      stats: '99.9% Uptime'
    }
  ]

  const useCases = [
    {
      title: 'Content Creation',
      description: 'Perfect for podcasters, streamers, and video creators',
      icon: '🎬',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      title: 'Music Production',
      description: 'Professional audio tools for musicians and producers',
      icon: '🎵',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
    },
    {
      title: 'Voice Training',
      description: 'Analyze and improve vocal performance with AI feedback',
      icon: '🎤',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    },
    {
      title: 'Language Learning',
      description: 'Perfect pronunciation analysis and feedback',
      icon: '🗣️',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative'
    }}>
      {/* Animated Background Pattern */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `,
        opacity: 0.6
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="AI POWERED" 
              sx={{ 
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: 'white',
                fontWeight: 600,
                mb: 3,
                px: 2
              }} 
            />
            
            <Typography 
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 900,
                color: 'white',
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI-Powered Audio Features
            </Typography>
            
            <Typography 
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Cutting-edge artificial intelligence technology powering next-generation 
              audio processing capabilities for professionals and creators.
            </Typography>
          </Box>
        </motion.div>

        {/* AI Features Grid */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {aiFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Grid item xs={12} sm={6} lg={4} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: `1px solid ${feature.color}40`,
                      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${feature.color}20`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                    }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{
                          width: 60,
                          height: 60,
                          background: `${feature.color}20`,
                          mr: 2
                        }}>
                          <Icon sx={{ fontSize: 28, color: feature.color }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                            {feature.title}
                          </Typography>
                          <Chip 
                            label={feature.stats} 
                            size="small" 
                            sx={{ 
                              backgroundColor: `${feature.color}20`,
                              color: feature.color,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }} 
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            Performance
                          </Typography>
                          <Typography variant="caption" sx={{ color: feature.color, fontWeight: 600 }}>
                            {feature.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={feature.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: `linear-gradient(90deg, ${feature.color}, ${feature.color}cc)`,
                              borderRadius: 3,
                            }
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

        {/* Use Cases Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
              Perfect for Every Use Case
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Designed for professionals across industries
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} md={3} key={useCase.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Card sx={{
                    background: useCase.gradient,
                    borderRadius: '20px',
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.2)',
                    }
                  }}>
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                      <Typography variant="h2" sx={{ mb: 2 }}>
                        {useCase.icon}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                        {useCase.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {useCase.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            mt: 8,
            textAlign: 'center'
          }}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
              Ready to Experience AI Audio?
            </Typography>
            
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
              Join thousands of creators using our AI-powered audio tools
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                borderRadius: '12px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                }
              }}
            >
              Start Processing Now
            </Button>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default AIFeaturesPage