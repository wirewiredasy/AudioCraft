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
  Build
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
      mx: 2
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            color: 'white', 
            fontWeight: 300,
            mb: 6,
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          Ready to enhance your audio?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {prefooterItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
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