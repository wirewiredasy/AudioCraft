import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Avatar,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import {
  MusicNote,
  People,
  TrendingUp,
  Security,
  Speed,
  Cloud
} from '@mui/icons-material'

const features = [
  {
    title: 'Advanced AI Technology',
    description: 'Powered by cutting-edge machine learning algorithms for superior audio processing',
    icon: MusicNote,
    color: '#3b82f6'
  },
  {
    title: 'User-Centric Design',
    description: 'Intuitive interface designed for both beginners and professionals',
    icon: People,
    color: '#10b981'
  },
  {
    title: 'Continuous Innovation',
    description: 'Regular updates with new features and improved algorithms',
    icon: TrendingUp,
    color: '#f59e0b'
  },
  {
    title: 'Privacy & Security',
    description: 'Your audio files are processed securely and never stored permanently',
    icon: Security,
    color: '#ef4444'
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized processing for quick results without compromising quality',
    icon: Speed,
    color: '#8b5cf6'
  },
  {
    title: 'Cloud Processing',
    description: 'Powerful cloud infrastructure for handling large audio files',
    icon: Cloud,
    color: '#06b6d4'
  }
]

function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            About Odoremover
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6, mb: 4 }}
          >
            We're on a mission to democratize professional audio processing with cutting-edge AI technology.
            Our platform makes advanced audio tools accessible to everyone, from content creators to music professionals.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                borderRadius: '12px'
              }}
            >
              Try Our Tools
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: '12px' }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>

        {/* Mission Statement */}
        <Card sx={{ mb: 8, borderRadius: '20px' }}>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
              Our Mission
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ textAlign: 'center', lineHeight: 1.8, maxWidth: 800, mx: 'auto' }}
            >
              To empower creators worldwide with professional-grade audio processing tools that are simple to use, 
              fast to process, and deliver exceptional results. We believe that advanced audio technology should be 
              accessible to everyone, regardless of their technical expertise.
            </Typography>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 6, textAlign: 'center' }}>
          What Makes Us Different
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Grid item xs={12} md={6} lg={4} key={feature.title}>
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
                        boxShadow: `0 20px 40px ${feature.color}30`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          backgroundColor: feature.color,
                          mx: 'auto',
                          mb: 3
                        }}
                      >
                        <Icon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        {/* Stats Section */}
        <Card sx={{ mb: 8, borderRadius: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent sx={{ p: 6 }}>
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                  100K+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Files Processed
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                  50K+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Happy Users
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', mb: 1 }}>
                  99.9%
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Uptime
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join thousands of creators who use our platform to enhance their audio content
          </Typography>
          <Button
            component={Link}
            to="/"
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
            Start Processing Audio
          </Button>
        </Box>
      </motion.div>
    </Container>
  )
}

export default AboutPage