import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Paper,
  Chip
} from '@mui/material'
import {
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  Star,
  Speed,
  HighQuality
} from '@mui/icons-material'

const tools = [
  {
    title: 'Vocal Remover',
    description: 'Remove vocals from songs using advanced AI separation',
    longDescription: 'AI-powered vocal isolation that separates vocals from instruments with professional quality. Perfect for creating karaoke tracks or isolating instruments.',
    icon: VolumeOff,
    path: '/vocal-remover',
    category: 'AI Processing',
    features: ['AI-powered separation', 'High quality output', 'Multiple formats'],
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  {
    title: 'Pitch + Tempo',
    description: 'Adjust pitch and tempo independently',
    longDescription: 'Professional pitch shifting and tempo adjustment without quality loss. Change key signatures or speed up/slow down audio while maintaining clarity.',
    icon: Tune,
    path: '/pitch-tempo',
    category: 'Audio Effects',
    features: ['Independent control', 'Real-time preview', 'Quality preservation'],
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  {
    title: 'Format Converter',
    description: 'Convert between audio formats',
    longDescription: 'Convert audio files between all popular formats with customizable quality settings. Batch processing supported for multiple files.',
    icon: SwapHoriz,
    path: '/format-converter',
    category: 'Conversion',
    features: ['Multiple formats', 'Quality options', 'Batch processing'],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  {
    title: 'Audio Editor',
    description: 'Cut and join audio files',
    longDescription: 'Precision audio editing with visual waveform display. Cut segments, join multiple files, and fine-tune audio with frame-accurate editing.',
    icon: ContentCut,
    path: '/audio-editor',
    category: 'Editing',
    features: ['Visual waveform', 'Precision cutting', 'Join multiple files'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    title: 'Noise Reduction',
    description: 'Remove noise and enhance clarity',
    longDescription: 'Advanced noise reduction algorithms that remove background noise, hiss, and artifacts while preserving audio quality and natural sound.',
    icon: MusicNote,
    path: '/noise-reduction',
    category: 'Enhancement',
    features: ['Smart noise detection', 'Clarity enhancement', 'Artifact removal'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  }
]

const categories = ['All', 'AI Processing', 'Audio Effects', 'Conversion', 'Editing', 'Enhancement']

function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory)

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 2
              }}
            >
              Audio Processing Tools
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Professional-grade audio processing powered by cutting-edge AI and digital signal processing algorithms
            </Typography>
          </Box>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{
                  color: selectedCategory === category ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: selectedCategory === category ? '#4ade80' : 'transparent',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: selectedCategory === category ? '#22c55e' : 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              />
            ))}
          </Box>
        </motion.div>

        {/* Tools Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Grid item xs={12} md={6} lg={4} key={tool.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Paper
                    sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 3,
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.9)',
                        border: `1px solid ${tool.color}`,
                      }
                    }}
                  >
                    {/* Background Gradient */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: tool.gradient
                    }} />

                    {/* Category Badge */}
                    <Chip
                      label={tool.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: tool.color,
                        color: 'white',
                        fontSize: '0.75rem'
                      }}
                    />

                    {/* Icon */}
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '12px',
                      background: tool.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3
                    }}>
                      <Icon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>

                    {/* Content */}
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {tool.title}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                      {tool.description}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3, flex: 1 }}>
                      {tool.longDescription}
                    </Typography>

                    {/* Features */}
                    <Box sx={{ mb: 3 }}>
                      {tool.features.map((feature, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Star sx={{ fontSize: 12, color: tool.color, mr: 1 }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Action Button */}
                    <Button
                      component={Link}
                      to={tool.path}
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: tool.color,
                        color: 'white',
                        fontWeight: 600,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: tool.color,
                          filter: 'brightness(1.1)',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Open Tool
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            p: 4,
            mb: 6
          }}>
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
              <Grid item xs={12} sm={4}>
                <Speed sx={{ fontSize: 40, color: '#4ade80', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  Fast
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Lightning-fast processing powered by optimized algorithms
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <HighQuality sx={{ fontSize: 40, color: '#3b82f6', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  Quality
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Professional-grade output that preserves audio fidelity
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Star sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  Easy
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Intuitive interface designed for both beginners and pros
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default ToolsPage