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
  Avatar,
  Slider
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  CloudUpload,
  Tune,
  Download,
  PlayArrow,
  Speed,
  MusicNote
} from '@mui/icons-material'

function HowToUsePitchTempo() {
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
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
              }}
            >
              <Tune sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              How to Use Pitch & Tempo
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Adjust pitch and tempo independently without losing audio quality using advanced algorithms
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 6 }}>
          <Box>
            <Card elevation={0} sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Simple 3-Step Process
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    {
                      step: '1',
                      title: 'Upload Your Audio',
                      desc: 'Choose any audio file to process',
                      icon: CloudUpload,
                      color: '#3b82f6'
                    },
                    {
                      step: '2', 
                      title: 'Adjust Settings',
                      desc: 'Use sliders to change pitch and tempo',
                      icon: Tune,
                      color: '#f59e0b'
                    },
                    {
                      step: '3',
                      title: 'Download Result',
                      desc: 'Get your processed audio file',
                      icon: Download,
                      color: '#10b981'
                    }
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <Box key={item.step} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar 
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            bgcolor: item.color,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.step}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.desc}
                          </Typography>
                        </Box>
                        <Icon sx={{ fontSize: 32, color: item.color }} />
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>

            {/* Control Examples */}
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Control Examples
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MusicNote color="primary" />
                      Pitch Control
                    </Typography>
                    <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 2, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Pitch: +3 semitones
                      </Typography>
                      <Slider
                        value={3}
                        min={-12}
                        max={12}
                        disabled
                        sx={{ color: '#3b82f6' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Change pitch without affecting playback speed. Perfect for key changes and vocal adjustments.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed color="primary" />
                      Tempo Control  
                    </Typography>
                    <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 2, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Tempo: 120% speed
                      </Typography>
                      <Slider
                        value={120}
                        min={50}
                        max={200}
                        disabled
                        sx={{ color: '#f59e0b' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Speed up or slow down audio while maintaining original pitch. Great for practice sessions.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card 
              elevation={0} 
              sx={{ 
                mb: 4, 
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                border: '1px solid #3b82f6'
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#1e40af' }}>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 3 }}>
                  {[
                    'Independent Control',
                    'High Quality',
                    'Real-time Preview',
                    'Multiple Formats',
                    'Batch Processing'
                  ].map((feature) => (
                    <Chip 
                      key={feature}
                      label={feature}
                      size="small"
                      sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#1e40af' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                component={Link}
                to="/pitch-tempo"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PlayArrow />}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Try Pitch & Tempo Tool
              </Button>
            </motion.div>

            <Card 
              elevation={0} 
              sx={{ 
                mt: 4,
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                border: '1px solid #f59e0b'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#92400e' }}>
                  💡 Use Cases
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, color: '#92400e' }}>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>Music practice at different speeds</Typography></li>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>Key transposition for singers</Typography></li>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>Audio synchronization</Typography></li>
                  <li><Typography variant="body2">Creative audio effects</Typography></li>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default HowToUsePitchTempo