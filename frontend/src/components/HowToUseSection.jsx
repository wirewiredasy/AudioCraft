import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  PlayArrow,
  ArrowForward
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
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  component={Link}
                  to="/how-to-use"
                  sx={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View All Guides
                </Button>
                
                <Typography variant="body2" sx={{ color: '#6b5b73', fontWeight: 500 }}>
                  Independent tutorials with professional quality guides
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Right Side - Tool Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Box sx={{ display: 'grid', gap: 3 }}>
              {[
                { 
                  title: 'Vocal Remover Guide', 
                  path: '/how-to-use-vocal-remover',
                  color: '#ef4444',
                  description: 'AI-powered vocal separation'
                },
                { 
                  title: 'Pitch & Tempo Guide', 
                  path: '/how-to-use-pitch-tempo',
                  color: '#3b82f6',
                  description: 'Professional audio adjustment'
                },
                { 
                  title: 'Format Converter Guide', 
                  path: '/how-to-use-format-converter',
                  color: '#8b5cf6',
                  description: 'Universal audio conversion'
                }
              ].map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 8, transition: { type: "spring", stiffness: 300 } }}
                >
                  <Card
                    component={Link}
                    to={guide.path}
                    sx={{
                      textDecoration: 'none',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: `0 8px 25px ${guide.color}40`,
                        border: `1px solid ${guide.color}60`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography 
                            variant="h6" 
                            fontWeight="bold" 
                            sx={{ color: '#2d1b40', mb: 0.5 }}
                          >
                            {guide.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ color: '#6b5b73' }}
                          >
                            {guide.description}
                          </Typography>
                        </Box>
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
              ))}
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default HowToUseSection