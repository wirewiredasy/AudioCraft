import React from 'react'
import { motion } from 'framer-motion'
import { Container, Typography, Box, Paper } from '@mui/material'
import { Security, Shield, Lock } from '@mui/icons-material'

function PrivacyPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Security sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 2 }}>
              Privacy Policy
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Your privacy is our priority
            </Typography>
          </Box>

          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            p: 4
          }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
              Data Protection
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3, lineHeight: 1.8 }}>
              We process your audio files locally and securely. No files are stored permanently on our servers.
            </Typography>
            
            <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>
              File Processing
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
              All audio processing happens on our secure servers and files are automatically deleted after processing.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default PrivacyPage