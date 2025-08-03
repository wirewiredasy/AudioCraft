
import React from 'react'
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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  MusicNote,
  Speed,
  Security,
  CloudUpload,
  HighQuality,
  Star,
  CheckCircle,
  Psychology,
  Engineering,
  TrendingUp
} from '@mui/icons-material'

const features = [
  {
    icon: Psychology,
    title: 'AI-Powered Processing',
    description: 'Advanced machine learning algorithms for superior audio separation and enhancement'
  },
  {
    icon: HighQuality,
    title: 'Professional Quality',
    description: 'Studio-grade audio processing that maintains original fidelity and clarity'
  },
  {
    icon: Speed,
    title: 'Lightning Fast',
    description: 'Optimized processing engines deliver results in seconds, not minutes'
  },
  {
    icon: Security,
    title: 'Secure & Private',
    description: 'Your files are processed securely and automatically deleted after completion'
  }
]

const stats = [
  { number: '1M+', label: 'Files Processed' },
  { number: '50K+', label: 'Happy Users' },
  { number: '99.9%', label: 'Uptime' },
  { number: '5★', label: 'User Rating' }
]

const team = [
  {
    name: 'Alex Johnson',
    role: 'Lead Audio Engineer',
    avatar: '/api/placeholder/100/100',
    description: 'Expert in digital signal processing with 10+ years in audio technology'
  },
  {
    name: 'Sarah Chen',
    role: 'AI Research Scientist',
    avatar: '/api/placeholder/100/100',
    description: 'PhD in Machine Learning, specializing in audio source separation'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Full Stack Developer',
    avatar: '/api/placeholder/100/100',
    description: 'Building scalable audio processing infrastructure and user experiences'
  }
]

function AboutPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              About Odoremover
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: '1.2rem'
              }}
            >
              We're revolutionizing audio processing with cutting-edge AI technology, making professional-grade 
              audio tools accessible to everyone. From musicians to podcasters, content creators to audio engineers.
            </Typography>
          </Box>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            mb: 8,
            textAlign: 'center'
          }}>
            <MusicNote sx={{ fontSize: 60, color: '#4ade80', mb: 3 }} />
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              maxWidth: '700px',
              mx: 'auto'
            }}>
              To democratize professional audio processing by providing accessible, AI-powered tools that deliver 
              studio-quality results. We believe that everyone should have access to professional audio editing 
              capabilities, regardless of their technical expertise or budget.
            </Typography>
          </Paper>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Why Choose Odoremover?
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Paper sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 4,
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Icon sx={{ fontSize: 40, color: '#4ade80', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', flex: 1 }}>
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

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
            borderRadius: '24px',
            p: 6,
            mb: 8
          }}>
            <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
              Trusted by Thousands
            </Typography>
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index} sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ 
                    color: '#4ade80', 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Paper sx={{
                    backgroundColor: 'rgba(45, 55, 72, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    p: 4,
                    textAlign: 'center',
                    height: '280px'
                  }}>
                    <Avatar sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto', 
                      mb: 2,
                      backgroundColor: '#4ade80'
                    }}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#4ade80', mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {member.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            mb: 8
          }}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Engineering sx={{ fontSize: 60, color: '#4ade80', mb: 3 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Cutting-Edge Technology
                </Typography>
                <List>
                  {[
                    'Advanced AI Neural Networks',
                    'Deep Learning Source Separation',
                    'Real-time Audio Processing',
                    'Cloud-based Infrastructure',
                    'Optimized Algorithms'
                  ].map((tech, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#4ade80' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={tech}
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            color: 'rgba(255, 255, 255, 0.8)' 
                          } 
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <TrendingUp sx={{ fontSize: 60, color: '#3b82f6', mb: 3 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Continuous Innovation
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: 1.8,
                  mb: 3
                }}>
                  We're constantly improving our algorithms and adding new features based on user feedback 
                  and the latest advances in audio processing technology.
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: 1.8
                }}>
                  Our commitment to excellence drives us to push the boundaries of what's possible in 
                  audio processing, ensuring you always have access to the best tools available.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default AboutPage
