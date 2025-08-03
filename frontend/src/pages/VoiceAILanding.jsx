import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Grid,
  Avatar,
  Chip
} from '@mui/material'
import {
  RecordVoiceOver,
  AutoAwesome,
  GraphicEq,
  Psychology,
  TrendingUp,
  Speed,
  HighQuality,
  Security,
  ArrowForward
} from '@mui/icons-material'

function VoiceAILanding() {
  const aiPages = [
    {
      title: 'Voice AI Studio',
      description: 'Interactive voice processing with real-time waveform visualization and AI-powered controls',
      path: '/voice-ai-style',
      icon: RecordVoiceOver,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      features: ['Real-time Processing', 'Voice Synthesis', 'Neural Networks']
    },
    {
      title: 'AI Features Hub',
      description: 'Comprehensive showcase of our cutting-edge artificial intelligence capabilities',
      path: '/ai-features',
      icon: AutoAwesome,  
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      features: ['Smart Enhancement', 'Performance Analytics', 'Cloud Integration']
    },
    {
      title: 'Processing Studio',
      description: 'Professional audio workstation with advanced tools and interactive controls',
      path: '/processing-studio',
      icon: GraphicEq,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      features: ['Professional Tools', 'Waveform Editor', 'Export Options']
    }
  ]

  const highlights = [
    { icon: Psychology, text: '99.7% AI Accuracy', color: '#8b5cf6' },
    { icon: Speed, text: '<50ms Latency', color: '#3b82f6' },
    { icon: HighQuality, text: '48kHz/24-bit Quality', color: '#10b981' },
    { icon: Security, text: 'Privacy First Design', color: '#ef4444' }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #533483 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="AI POWERED SUITE" 
              sx={{ 
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: 'white',
                fontWeight: 600,
                mb: 3,
                px: 3,
                py: 1,
                fontSize: '0.9rem'
              }} 
            />
            
            <Typography 
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                fontWeight: 900,
                color: 'white',
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
              }}
            >
              Voice AI Experience
            </Typography>
            
            <Typography 
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 6,
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Explore our cutting-edge AI-powered audio processing suite inspired by Voice.AI. 
              Professional tools with modern voice user interface design patterns.
            </Typography>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon
                return (
                  <Grid item xs={6} md={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar sx={{
                          width: 50,
                          height: 50,
                          background: `${highlight.color}20`,
                          mb: 1,
                          mx: 'auto'
                        }}>
                          <Icon sx={{ color: highlight.color, fontSize: 24 }} />
                        </Avatar>
                        <Typography variant="body2" fontWeight="bold" sx={{ color: highlight.color }}>
                          {highlight.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </motion.div>

        {/* AI Pages Grid */}
        <Grid container spacing={4}>
          {aiPages.map((page, index) => {
            const Icon = page.icon
            return (
              <Grid item xs={12} md={4} key={page.title}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -12, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${page.color}40`,
                      boxShadow: `0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px ${page.color}25`,
                      transform: 'translateY(-8px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: page.gradient,
                    }
                  }}>
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Icon and Title */}
                      <Box sx={{ mb: 3 }}>
                        <Avatar sx={{
                          width: 80,
                          height: 80,
                          background: page.gradient,
                          mb: 2,
                          boxShadow: `0 8px 25px ${page.color}40`
                        }}>
                          <Icon sx={{ fontSize: 36 }} />
                        </Avatar>
                        
                        <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                          {page.title}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          lineHeight: 1.6,
                          mb: 3
                        }}>
                          {page.description}
                        </Typography>
                      </Box>

                      {/* Features */}
                      <Box sx={{ mb: 4, flex: 1 }}>
                        {page.features.map((feature, idx) => (
                          <Chip 
                            key={idx}
                            label={feature} 
                            size="small" 
                            sx={{ 
                              backgroundColor: `${page.color}15`,
                              color: page.color,
                              fontWeight: 500,
                              mr: 1,
                              mb: 1,
                              border: `1px solid ${page.color}30`
                            }} 
                          />
                        ))}
                      </Box>

                      {/* Action Button */}
                      <Button
                        component={Link}
                        to={page.path}
                        variant="contained"
                        endIcon={<ArrowForward />}
                        fullWidth
                        sx={{
                          background: page.gradient,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          borderRadius: '12px',
                          textTransform: 'none',
                          '&:hover': {
                            background: page.gradient,
                            boxShadow: `0 8px 25px ${page.color}40`,
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        Explore {page.title}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 8,
            mt: 8,
            textAlign: 'center'
          }}>
            <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
              Experience the Future
            </Typography>
            
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, maxWidth: 600, mx: 'auto' }}>
              Professional audio processing with modern Voice.AI inspired design patterns and cutting-edge artificial intelligence
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/voice-ai-style"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                  }
                }}
              >
                Start Voice AI Experience
              </Button>
              
              <Button
                component={Link}
                to="/processing-studio"
                variant="outlined"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                Open Studio
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default VoiceAILanding