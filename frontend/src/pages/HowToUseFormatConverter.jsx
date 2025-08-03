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
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  CloudUpload,
  SwapHoriz,
  Download,
  PlayArrow,
  CheckCircle,
  Info,
  ArrowBack,
  ArrowForward,
  HighQuality,
  Settings
} from '@mui/icons-material'

const steps = [
  {
    label: 'Upload Audio File',
    description: 'Select your audio file for conversion',
    icon: CloudUpload,
    details: 'Support for MP3, WAV, FLAC, M4A, AAC, OGG, WMA formats'
  },
  {
    label: 'Choose Format',
    description: 'Select target format and quality settings',
    icon: SwapHoriz,
    details: 'Multiple format options with customizable quality levels'
  },
  {
    label: 'Download Result',
    description: 'Get your converted audio file',
    icon: Download,
    details: 'High-quality conversion preserving audio fidelity'
  }
]

const formats = [
  { format: 'MP3', quality: '320kbps', compatibility: 'Universal', size: 'Small' },
  { format: 'WAV', quality: 'Lossless', compatibility: 'High', size: 'Large' },
  { format: 'FLAC', quality: 'Lossless', compatibility: 'Good', size: 'Medium' },
  { format: 'M4A', quality: '256kbps', compatibility: 'Apple', size: 'Small' },
  { format: 'OGG', quality: '320kbps', compatibility: 'Open', size: 'Small' }
]

const features = [
  {
    title: 'Batch Conversion',
    description: 'Convert multiple files simultaneously for efficiency',
    icon: Settings,
    color: '#8b5cf6'
  },
  {
    title: 'Quality Presets',
    description: 'Choose from optimized quality settings for different needs',
    icon: HighQuality,
    color: '#10b981'
  },
  {
    title: 'Format Detection',
    description: 'Automatic detection and validation of input formats',
    icon: SwapHoriz,
    color: '#f59e0b'
  }
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
            Universal audio format conversion with quality optimization and batch processing capabilities
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Button
            component={Link}
            to="/how-to-use-pitch-tempo"
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Pitch & Tempo Guide
          </Button>
          <Button
            component={Link}
            to="/format-converter"
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '12px',
              px: 4
            }}
          >
            Try Tool Now
          </Button>
          <Button
            component={Link}
            to="/how-to-use-audio-editor"
            endIcon={<ArrowForward />}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          >
            Audio Editor Guide
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
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
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

        {/* Format Comparison */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Supported Formats Comparison
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                    <TableCell><Typography fontWeight="bold">Format</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Quality</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Compatibility</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">File Size</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formats.map((row) => (
                    <TableRow key={row.format} hover>
                      <TableCell>
                        <Chip 
                          label={row.format} 
                          color="primary" 
                          variant="outlined" 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{row.quality}</TableCell>
                      <TableCell>{row.compatibility}</TableCell>
                      <TableCell>{row.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Features */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
              Advanced Features
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
              Best Practices & Tips
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Quality Preservation
                  </Typography>
                  <Typography variant="body2">
                    Convert lossless to lossless for best quality preservation
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    File Size Management
                  </Typography>
                  <Typography variant="body2">
                    Choose MP3 320kbps for balance between quality and size
                  </Typography>
                </Alert>
              </Grid>
              <Grid item xs={12} md={6}>
                <Alert 
                  severity="warning" 
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Avoid Re-compression
                  </Typography>
                  <Typography variant="body2">
                    Converting lossy to lossy formats may reduce audio quality
                  </Typography>
                </Alert>
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ borderRadius: '12px', mb: 2 }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Batch Processing
                  </Typography>
                  <Typography variant="body2">
                    Use batch conversion for multiple files to save time
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Convert?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/format-converter"
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                px: 4,
                py: 1.5,
                borderRadius: '12px'
              }}
            >
              Start Converting
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

export default HowToUseFormatConverter