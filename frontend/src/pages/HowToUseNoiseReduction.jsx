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
  Grid,
  Alert
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  CloudUpload,
  NoiseControlOff,
  Download,
  PlayArrow,
  CheckCircle,
  Info,
  ArrowBack,
  ArrowForward,
  VolumeUp,
  Tune
} from '@mui/icons-material'

const steps = [
  {
    label: 'Upload Audio File',
    description: 'Select your noisy audio file for processing',
    icon: CloudUpload,
    details: 'Support for MP3, WAV, FLAC, M4A, AAC formats up to 100MB'
  },
  {
    label: 'Noise Analysis',
    description: 'AI analyzes and identifies background noise patterns',
    icon: NoiseControlOff,
    details: 'Advanced algorithms detect and separate noise from speech/music'
  },
  {
    label: 'Download Result',
    description: 'Get your clean, noise-free audio',
    icon: Download,
    details: 'High-quality output with preserved audio clarity'
  }
]

const features = [
  {
    title: 'Smart Noise Detection',
    description: 'Automatically identifies different types of background noise',
    icon: NoiseControlOff,
    color: '#10b981'
  },
  {
    title: 'Voice Preservation',
    description: 'Maintains vocal quality while removing unwanted sounds',
    icon: VolumeUp,
    color: '#3b82f6'
  },
  {
    title: 'Adjustable Strength',
    description: 'Fine-tune noise reduction intensity for perfect results',
    icon: Tune,
    color: '#8b5cf6'
  }
]

function HowToUseNoiseReduction() {
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
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
              }}
            >
              <NoiseControlOff sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              How to Use Noise Reduction
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Remove background noise and enhance audio clarity using professional-grade noise reduction algorithms
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Button
            component={Link}
            to="/how-to-use-audio-editor"
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Audio Editor Guide
          </Button>
          <Button
            component={Link}
            to="/noise-reduction"
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '12px',
              px: 4
            }}
          >
            Try Tool Now
          </Button>
          <Button
            component={Link}
            to="/how-to-use"
            endIcon={<ArrowForward />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            All Guides
          </Button>
        </Box>

        {/* Steps */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Step-by-Step Process
            </Typography>
            <Stepper orientation="vertical">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Step key={step.label} active={true} completed={false}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                          }}
                        >
                          <Icon sx={{ fontSize: 20 }} />
                        </Avatar>
                      )}
                    >
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {step.label}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                          {step.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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

        {/* Features */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Noise Reduction Features
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Grid item xs={12} md={4} key={feature.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: '16px',
                          background: `${feature.color}10`,
                          border: `1px solid ${feature.color}30`,
                          height: '100%'
                        }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 50, 
                            height: 50, 
                            backgroundColor: feature.color,
                            mb: 2 
                          }}
                        >
                          <Icon sx={{ fontSize: 24 }} />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Tips for Best Results
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Consistent Noise
                  </Typography>
                  <Typography variant="body2">
                    Works best with consistent background noise (AC, fans, traffic)
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Preview First
                  </Typography>
                  <Typography variant="body2">
                    Test with a small sample before processing long audio files
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="warning" 
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Moderate Settings
                  </Typography>
                  <Typography variant="body2">
                    Avoid over-processing which may affect voice quality
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Quality Input
                  </Typography>
                  <Typography variant="body2">
                    Higher quality input files produce better noise reduction results
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Clean Your Audio?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/noise-reduction"
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                px: 4,
                py: 1.5,
                borderRadius: '12px'
              }}
            >
              Start Noise Reduction
            </Button>
            <Button
              component={Link}
              to="/how-to-use"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: '12px' }}
            >
              All Guides
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  )
}

export default HowToUseNoiseReduction