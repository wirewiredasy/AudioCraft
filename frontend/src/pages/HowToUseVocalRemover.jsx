import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  Chip,
  Avatar
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  CloudUpload,
  VolumeOff,
  Download,
  PlayArrow,
  CheckCircle,
  Info
} from '@mui/icons-material'

const steps = [
  {
    label: 'Upload Audio File',
    description: 'Select or drag & drop your audio file',
    icon: CloudUpload,
    details: 'Support for MP3, WAV, FLAC, M4A, AAC formats up to 100MB'
  },
  {
    label: 'AI Processing',
    description: 'Advanced AI separates vocals from instruments',
    icon: VolumeOff,
    details: 'Our AI analyzes the audio and isolates vocal frequencies'
  },
  {
    label: 'Download Result',
    description: 'Get your vocal-free instrumental track',
    icon: Download,
    details: 'High-quality output in the same format as your input'
  }
]

function HowToUseVocalRemover() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
              }}
            >
              <VolumeOff sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              How to Use Vocal Remover
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Remove vocals from any song using advanced AI-powered source separation technology
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 6 }}>
          
          {/* Left Column - Step by Step Guide */}
          <Box>
            <Card elevation={0} sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Info color="primary" />
                  Step-by-Step Process
                </Typography>

                <Stepper orientation="vertical" sx={{ mt: 2 }}>
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <Step key={step.label} active={true}>
                        <StepLabel
                          icon={
                            <Avatar 
                              sx={{ 
                                width: 40, 
                                height: 40,
                                bgcolor: index === 0 ? '#3b82f6' : index === 1 ? '#ef4444' : '#10b981'
                              }}
                            >
                              <Icon sx={{ fontSize: 20 }} />
                            </Avatar>
                          }
                        >
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {step.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {step.description}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
                              {step.details}
                            </Typography>
                          </Box>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Technical Features
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  {[
                    'AI-Powered Separation',
                    'High Quality Output',
                    'Multiple Formats',
                    'Fast Processing',
                    'No Quality Loss',
                    'Batch Processing'
                  ].map((feature) => (
                    <Chip 
                      key={feature}
                      label={feature}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Our vocal removal tool uses advanced machine learning algorithms to analyze 
                  audio frequencies and separate vocal tracks from instrumental music. The AI 
                  has been trained on thousands of songs to provide the highest quality results 
                  while preserving the original audio fidelity.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Quick Info & CTA */}
          <Box>
            {/* Quick Stats */}
            <Card 
              elevation={0} 
              sx={{ 
                mb: 4, 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                border: '1px solid #f59e0b'
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#92400e' }}>
                  Processing Stats
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="#92400e">
                      98%
                    </Typography>
                    <Typography variant="body2" color="#92400e">
                      Success Rate
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color="#92400e">
                      30s
                    </Typography>
                    <Typography variant="body2" color="#92400e">
                      Avg. Processing
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#92400e', opacity: 0.8 }}>
                  Fast, reliable vocal separation for professional results
                </Typography>
              </CardContent>
            </Card>

            {/* Supported Formats */}
            <Card elevation={0} sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Supported Formats
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['MP3', 'WAV', 'FLAC', 'M4A', 'AAC', 'OGG'].map((format) => (
                    <Chip 
                      key={format}
                      label={format}
                      size="small"
                      sx={{ bgcolor: '#f1f5f9', color: '#475569' }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Maximum file size: 100MB per upload
                </Typography>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                component={Link}
                to="/vocal-remover"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PlayArrow />}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Try Vocal Remover Now
              </Button>
            </motion.div>

            {/* Tips */}
            <Card 
              elevation={0} 
              sx={{ 
                mt: 4,
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                border: '1px solid #3b82f6'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#1e40af' }}>
                  💡 Pro Tips
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, color: '#1e40af' }}>
                  <li>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Works best with studio-recorded songs
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Higher quality input = better results
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Perfect for creating karaoke tracks
                    </Typography>
                  </li>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default HowToUseVocalRemover