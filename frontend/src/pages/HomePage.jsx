import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Box,
  Chip
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
    title: 'Vocal Remover',
    description: 'Remove vocals from any song using AI-powered source separation. Perfect for creating karaoke tracks.',
    icon: VolumeOff,
    path: '/vocal-remover',
    tech: ['Spleeter', 'TensorFlow', 'AI Separation'],
    color: '#ef4444'
  },
  {
    title: 'Pitch & Tempo Adjustment',
    description: 'Change pitch and tempo independently without affecting audio quality. Professional audio manipulation.',
    icon: Tune,
    path: '/pitch-tempo',
    tech: ['Librosa', 'PSOLA', 'Time Stretching'],
    color: '#8b5cf6'
  },
  {
    title: 'Format Converter',
    description: 'Convert between all major audio formats with customizable quality settings and metadata preservation.',
    icon: SwapHoriz,
    path: '/format-converter',
    tech: ['FFmpeg', 'High Quality', 'Batch Processing'],
    color: '#10b981'
  },
  {
    title: 'Audio Editor',
    description: 'Cut, join, and edit audio files with precision. Timeline-based editing with visual waveforms.',
    icon: ContentCut,
    path: '/audio-editor',
    tech: ['Waveform Editor', 'Precision Cutting', 'Audio Joining'],
    color: '#f59e0b'
  },
  {
    title: 'Noise Reduction',
    description: 'Remove background noise, hum, and unwanted artifacts using advanced noise reduction algorithms.',
    icon: MusicNote,
    path: '/noise-reduction',
    tech: ['Spectral Subtraction', 'Adaptive Filtering', 'AI Denoising'],
    color: '#06b6d4'
  }
]

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Audio Processing Studio
        </Typography>
        
        <Typography 
          variant="h5" 
          color="textSecondary" 
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Professional audio processing tools powered by cutting-edge AI and advanced algorithms. 
          Transform your audio with precision and quality.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<GraphicEq />} 
            label="AI-Powered" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label="High Quality" 
            color="secondary" 
            variant="outlined" 
          />
          <Chip 
            label="Fast Processing" 
            color="success" 
            variant="outlined" 
          />
          <Chip 
            label="Professional Grade" 
            color="warning" 
            variant="outlined" 
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Grid item xs={12} md={6} lg={4} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.3)`
                  }
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Icon 
                      sx={{ 
                        fontSize: 32, 
                        color: feature.color,
                        mr: 1
                      }} 
                    />
                    <Typography variant="h6" component="h2" fontWeight="bold">
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {feature.tech.map((tech, index) => (
                      <Chip 
                        key={index}
                        label={tech} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ pt: 0 }}>
                  <Button 
                    component={Link}
                    to={feature.path}
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: feature.color,
                      '&:hover': {
                        backgroundColor: feature.color,
                        opacity: 0.8
                      }
                    }}
                  >
                    Open Tool
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Process Your Audio?
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Choose any tool above to get started with professional audio processing
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          component={Link}
          to="/vocal-remover"
          sx={{ 
            px: 4, 
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
            }
          }}
        >
          Start Processing
        </Button>
      </Box>
    </Container>
  )
}

export default HomePage