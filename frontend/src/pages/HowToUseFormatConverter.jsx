import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Chip,
  Avatar,
  Grid
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  SwapHoriz,
  AudioFile,
  HighQuality,
  Speed,
  PlayArrow
} from '@mui/icons-material'

const formats = [
  { from: 'MP3', to: 'WAV', color: '#ef4444' },
  { from: 'FLAC', to: 'MP3', color: '#3b82f6' },
  { from: 'M4A', to: 'OGG', color: '#10b981' },
  { from: 'WAV', to: 'FLAC', color: '#f59e0b' },
  { from: 'AAC', to: 'MP3', color: '#8b5cf6' },
  { from: 'OGG', to: 'WAV', color: '#06b6d4' }
]

function HowToUseFormatConverter() {
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
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
              }}
            >
              <SwapHoriz sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              How to Use Format Converter
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Convert audio files between all popular formats with professional quality preservation
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 6 }}>
          <Box>
            {/* Conversion Examples */}
            <Card elevation={0} sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Popular Conversions
                </Typography>
                
                <Grid container spacing={2}>
                  {formats.map((format, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2, 
                            p: 2, 
                            bgcolor: '#f8fafc', 
                            borderRadius: 2,
                            border: `1px solid ${format.color}20`
                          }}
                        >
                          <Chip 
                            label={format.from} 
                            sx={{ 
                              bgcolor: format.color, 
                              color: 'white',
                              fontWeight: 'bold'
                            }} 
                          />
                          <SwapHoriz sx={{ color: format.color }} />
                          <Chip 
                            label={format.to} 
                            variant="outlined"
                            sx={{ 
                              borderColor: format.color,
                              color: format.color,
                              fontWeight: 'bold'
                            }} 
                          />
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Features */}
            <Card elevation={0} sx={{ border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Conversion Features
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                  {[
                    {
                      icon: HighQuality,
                      title: 'Lossless Quality',
                      desc: 'Preserve original audio fidelity during conversion',
                      color: '#10b981'
                    },
                    {
                      icon: Speed,
                      title: 'Fast Processing',
                      desc: 'Quick conversion with optimized algorithms',
                      color: '#f59e0b'
                    },
                    {
                      icon: AudioFile,
                      title: 'Multiple Formats',
                      desc: 'Support for all major audio file formats',
                      color: '#3b82f6'
                    },
                    {
                      icon: SwapHoriz,
                      title: 'Batch Convert',
                      desc: 'Convert multiple files simultaneously',
                      color: '#8b5cf6'
                    }
                  ].map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                        <Avatar sx={{ bgcolor: feature.color, width: 48, height: 48 }}>
                          <Icon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.desc}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box>
            {/* Supported Formats */}
            <Card elevation={0} sx={{ mb: 4, border: '1px solid #e2e8f0' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Supported Formats
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {['MP3', 'WAV', 'FLAC', 'M4A', 'AAC', 'OGG', 'WMA', 'AIFF'].map((format) => (
                    <Chip 
                      key={format}
                      label={format}
                      sx={{ 
                        bgcolor: '#f1f5f9', 
                        color: '#475569',
                        fontWeight: 'bold'
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Convert between any supported formats with customizable quality settings
                </Typography>
              </CardContent>
            </Card>

            {/* Quality Options */}
            <Card 
              elevation={0} 
              sx={{ 
                mb: 4,
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                border: '1px solid #8b5cf6'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#6b21a8' }}>
                  Quality Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { label: 'Original', desc: 'Keep source quality' },
                    { label: 'High', desc: '320 kbps / 96 kHz' },
                    { label: 'Standard', desc: '192 kbps / 44.1 kHz' },
                    { label: 'Compressed', desc: '128 kbps / 22 kHz' }
                  ].map((quality) => (
                    <Box key={quality.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: '#6b21a8' }}>
                        {quality.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b21a8', opacity: 0.8 }}>
                        {quality.desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                component={Link}
                to="/format-converter"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PlayArrow />}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                    boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Try Format Converter
              </Button>
            </motion.div>

            <Card 
              elevation={0} 
              sx={{ 
                mt: 4,
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                border: '1px solid #10b981'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#065f46' }}>
                  💡 Pro Tips
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, color: '#065f46' }}>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>Use FLAC for archival quality</Typography></li>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>MP3 320kbps for web streaming</Typography></li>
                  <li><Typography variant="body2" sx={{ mb: 1 }}>WAV for professional editing</Typography></li>
                  <li><Typography variant="body2">AAC for mobile devices</Typography></li>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default HowToUseFormatConverter