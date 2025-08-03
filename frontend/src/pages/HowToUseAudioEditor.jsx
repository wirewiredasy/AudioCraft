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
  ContentCut,
  Download,
  PlayArrow,
  CheckCircle,
  Info,
  ArrowBack,
  ArrowForward,
  Timeline,
  CallMerge
} from '@mui/icons-material'

const steps = [
  {
    label: 'Upload Audio Files',
    description: 'Select audio files for editing',
    icon: CloudUpload,
    details: 'Upload single or multiple files for cutting and joining operations'
  },
  {
    label: 'Edit Audio',
    description: 'Cut, trim, or join audio segments',
    icon: ContentCut,
    details: 'Visual waveform editing with precise time controls'
  },
  {
    label: 'Download Result',
    description: 'Get your edited audio file',
    icon: Download,
    details: 'High-quality output maintaining original audio properties'
  }
]

const features = [
  {
    title: 'Precision Cutting',
    description: 'Cut audio files with millisecond precision using visual waveforms',
    icon: ContentCut,
    color: '#f59e0b'
  },
  {
    title: 'Audio Joining',
    description: 'Seamlessly merge multiple audio files into one continuous track',
    icon: CallMerge,
    color: '#10b981'
  },
  {
    title: 'Waveform Display',
    description: 'Visual representation of audio for accurate editing decisions',
    icon: Timeline,
    color: '#3b82f6'
  }
]

function HowToUseAudioEditor() {
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
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
              }}
            >
              <ContentCut sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              How to Use Audio Editor
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Professional audio editing with visual waveforms for precise cutting, trimming, and joining operations
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Button
            component={Link}
            to="/how-to-use-format-converter"
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Format Converter Guide
          </Button>
          <Button
            component={Link}
            to="/audio-editor"
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              borderRadius: '12px',
              px: 4
            }}
          >
            Try Tool Now
          </Button>
          <Button
            component={Link}
            to="/how-to-use-noise-reduction"
            endIcon={<ArrowForward />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Noise Reduction Guide
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
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
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
              Editing Features
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
              Editing Tips & Best Practices
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Clean Cuts
                  </Typography>
                  <Typography variant="body2">
                    Cut at zero-crossing points to avoid audio pops and clicks
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Fade In/Out
                  </Typography>
                  <Typography variant="body2">
                    Use fade effects for smooth transitions between segments
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="warning" 
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    File Formats
                  </Typography>
                  <Typography variant="body2">
                    Keep original format for joining files to maintain quality
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Backup Originals
                  </Typography>
                  <Typography variant="body2">
                    Always keep backup copies of your original files
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Edit?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/audio-editor"
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                px: 4,
                py: 1.5,
                borderRadius: '12px'
              }}
            >
              Start Editing
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

export default HowToUseAudioEditor