import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Paper
} from '@mui/material'
import {
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote
} from '@mui/icons-material'
import Prefooter from '../components/Prefooter'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'Remove vocals from songs',
    icon: VolumeOff,
    path: '/vocal-remover',
    waveform: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
  },
  {
    title: 'Pitch + Tempo',
    description: 'Adjust pitch and tempo',
    icon: Tune,
    path: '/pitch-tempo',
    waveform: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
  },
  {
    title: 'Noise Reducer',
    description: 'Remove noise and artifacts',
    icon: MusicNote,
    path: '/noise-reduction',
    waveform: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
  },
  {
    title: 'Format Converter',
    description: 'Convert audio formats',
    icon: SwapHoriz,
    path: '/format-converter',
    waveform: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
  }
]

function NewHomePage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Animated Wave Background */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 320'%3E%3Cpath fill='%23ffffff10' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        opacity: 0.6
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h1" 
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 300,
              color: 'white',
              lineHeight: 1.1,
              mb: 4
            }}
          >
            Remove vocals.
            <br />
            Change pitch.
            <br />
            Convert formats.
          </Typography>
          
          <Button 
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#1a1d29',
              fontWeight: 600,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            GET STARTED
          </Button>
        </Box>

        {/* Audio Tools Grid */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Grid item xs={12} sm={6} lg={3} key={tool.title}>
                <Paper
                  sx={{
                    backgroundColor: 'rgba(45, 55, 72, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    p: 3,
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      backgroundColor: 'rgba(55, 65, 82, 0.9)',
                    }
                  }}
                  component={Link}
                  to={tool.path}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {tool.description}
                    </Typography>
                  </Box>

                  {/* Audio Waveform Visualization */}
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <Box sx={{
                      width: '100%',
                      height: '60px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Simulated waveform */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        height: '40px',
                        gap: '1px'
                      }}>
                        {Array.from({ length: 40 }, (_, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '2px',
                              height: `${Math.random() * 30 + 5}px`,
                              backgroundColor: '#4ade80',
                              borderRadius: '1px',
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </Box>
                      
                      {/* Play button overlay */}
                      <Box sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 24,
                        height: 24,
                        backgroundColor: '#4ade80',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}>
                        <Box sx={{
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid white',
                          borderTop: '4px solid transparent',
                          borderBottom: '4px solid transparent',
                          marginLeft: '1px'
                        }} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Controls */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      px: 1,
                      py: 0.5
                    }}>
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        {String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, mx: 1 }}>
                      <Box sx={{
                        height: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '1px',
                        position: 'relative'
                      }}>
                        <Box sx={{
                          width: `${Math.random() * 60 + 20}%`,
                          height: '100%',
                          backgroundColor: '#4ade80',
                          borderRadius: '1px'
                        }} />
                      </Box>
                    </Box>
                    <Box sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      px: 1,
                      py: 0.5
                    }}>
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        03:24
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: '#4ade80',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#22c55e',
                      }
                    }}
                  >
                    Open Better
                  </Button>
                </Paper>
              </Grid>
            )
          })}
        </Grid>

        {/* About Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 300, 
              mb: 4,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            About
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            Advanced audio processing tools powered by cutting-edge AI algorithms. Remove vocals, adjust pitch and tempo, convert formats, and reduce noise with professional-grade quality. Perfect for musicians, podcasters, and audio enthusiasts.
          </Typography>
        </Box>

        {/* Prefooter */}
        <Prefooter />
      </Container>
    </Box>
  )
}

export default NewHomePage