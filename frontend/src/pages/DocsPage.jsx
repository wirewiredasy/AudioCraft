import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Button,
  Chip
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  Code,
  Hub,
  Description,
  Api,
  School,
  CloudUpload
} from '@mui/icons-material'

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/vocal-remover',
    description: 'Remove vocals from audio files',
    params: ['audio_file', 'quality (optional)']
  },
  {
    method: 'POST',
    endpoint: '/api/pitch-tempo',
    description: 'Adjust pitch and tempo',
    params: ['audio_file', 'pitch_shift', 'tempo_change']
  },
  {
    method: 'POST',
    endpoint: '/api/format-converter',
    description: 'Convert audio formats',
    params: ['audio_file', 'output_format', 'quality']
  }
]

const tutorials = [
  {
    title: 'Getting Started with API',
    description: 'Learn how to authenticate and make your first API call',
    icon: Code,
    color: '#3b82f6'
  },
  {
    title: 'Batch Processing',
    description: 'Process multiple files efficiently',
    icon: CloudUpload,
    color: '#10b981'
  },
  {
    title: 'Integration Examples',
    description: 'Real-world integration examples and best practices',
    icon: Hub,
    color: '#8b5cf6'
  }
]

function DocsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Documentation
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Complete guide to integrating our audio processing API into your applications
          </Typography>
        </Box>

        {/* API Overview */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              API Overview
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Our RESTful API provides programmatic access to all audio processing tools. 
              Built for developers who need to integrate audio processing capabilities into their applications.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Api sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    RESTful API
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Standard HTTP methods with JSON responses
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Description sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    OpenAPI Spec
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Complete OpenAPI 3.0 specification available
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    SDK Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Python, JavaScript, and cURL examples
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card sx={{ mb: 6, borderRadius: '20px' }}>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              API Endpoints
            </Typography>
            <Box>
              {apiEndpoints.map((endpoint, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    mb: 3, 
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip 
                        label={endpoint.method}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography 
                        variant="h6" 
                        fontFamily="monospace"
                        sx={{ color: 'primary.main' }}
                      >
                        {endpoint.endpoint}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {endpoint.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Parameters:</strong> {endpoint.params.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Tutorials */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Tutorials & Examples
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon
            return (
              <Grid item xs={12} md={4} key={tutorial.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${tutorial.color}30`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Icon 
                        sx={{ 
                          fontSize: 48, 
                          color: tutorial.color,
                          mb: 2 
                        }} 
                      />
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        {tutorial.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {tutorial.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Getting Started */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Contact us to get your API keys and start integrating our audio processing capabilities
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              borderRadius: '12px'
            }}
          >
            Get API Access
          </Button>
        </Box>
      </motion.div>
    </Container>
  )
}

export default DocsPage