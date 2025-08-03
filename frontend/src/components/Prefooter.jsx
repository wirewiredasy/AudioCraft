import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Paper, Button } from '@mui/material'
import { 
  VolumeOff, 
  Tune, 
  SwapHoriz, 
  ContentCut, 
  MusicNote,
  Security,
  Help,
  Build,
  Stars,
  AutoAwesome
} from '@mui/icons-material'

const prefooterItems = [
  {
    icon: Build,
    title: 'Explore Tools',
    description: 'Discover all audio processing tools',
    link: '/tools',
    color: '#4ade80'
  },
  {
    icon: Security,
    title: 'Privacy First',
    description: 'Your files are processed securely',
    link: '/privacy',
    color: '#3b82f6'
  },
  {
    icon: Help,
    title: 'How to Use',
    description: 'Step-by-step guides and tutorials',
    link: '/how-to-use',
    color: '#f59e0b'
  }
]

function Prefooter() {
  return (
    <Box sx={{ 
      py: 8, 
      px: 3,
      background: 'linear-gradient(135deg, rgba(26, 29, 41, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      mt: 8,
      mx: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cdefs%3E%3CradialGradient id='a' cx='50' cy='50' r='50'%3E%3Cstop offset='0' stop-color='%234ade80' stop-opacity='.1'/%3E%3Cstop offset='1' stop-color='%234ade80' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='10' cy='10' r='2' fill='url(%23a)'%3E%3Canimation attributeName='r' values='2;4;2' dur='3s' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='90' cy='10' r='2' fill='url(%23a)'%3E%3Canimation attributeName='r' values='2;4;2' dur='3s' begin='1.5s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6, position: 'relative' }}>
            <AutoAwesome sx={{ 
              fontSize: 40, 
              color: '#4ade80', 
              mb: 2,
              animation: 'pulse 2s infinite'
            }} />
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                fontWeight: 300,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                background: 'linear-gradient(45deg, #ffffff 30%, #4ade80 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Ready to enhance your audio?
            </Typography>
            <Stars sx={{ 
              position: 'absolute', 
              top: -10, 
              right: '30%', 
              color: '#f59e0b',
              fontSize: 20,
              animation: 'sparkle 1.5s ease-in-out infinite'
            }} />
          </Box>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {prefooterItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Paper
                    component={Link}
                    to={item.link}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      backgroundColor: 'rgba(45, 55, 72, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.8)',
                        border: `1px solid ${item.color}`,
                      }
                    }}
                  >
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <Icon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ color: 'white', fontWeight: 600, mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                    >
                      {item.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{
                        color: item.color,
                        borderColor: item.color,
                        '&:hover': {
                          backgroundColor: item.color,
                          color: 'white',
                          borderColor: item.color,
                        }
                      }}
                    >
                      Learn More →
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/tools"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#4ade80',
              color: 'white',
              fontWeight: 600,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: '#22c55e',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explore All Tools
          </Button>
        </Box>
      </motion.div>
    </Box>
  )
}

export default Prefooter