import React from 'react'
import { motion } from 'framer-motion'
import { Container, Typography, Box, Paper, Grid } from '@mui/material'
import { Help, Upload, Settings, Download } from '@mui/icons-material'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Audio',
    description: 'Select and upload your audio file in any supported format'
  },
  {
    icon: Settings,
    title: 'Choose Processing',
    description: 'Select the audio processing tool you want to use'
  },
  {
    icon: Download,
    title: 'Download Result',
    description: 'Download your processed audio file instantly'
  }
]

function HowToUsePage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Help sx={{ fontSize: 60, color: '#f59e0b', mb: 2 }} />
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 2 }}>
              How to Use
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Simple steps to process your audio
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Paper sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 4,
                      textAlign: 'center',
                      height: '100%'
                    }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#4ade80',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3
                      }}>
                        <Icon sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                      
                      <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
                        {step.title}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {step.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HowToUsePage