
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { Scale, Security, Info } from '@mui/icons-material'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using Odoremover's audio processing services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
  },
  {
    title: '2. Use License',
    content: `Permission is granted to temporarily download one copy of Odoremover's materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on the website, or remove any copyright or other proprietary notations from the materials.`
  },
  {
    title: '3. Audio File Processing',
    content: `You retain full ownership of your audio files. We process your files solely to provide the requested audio processing services. Files are automatically deleted from our servers after processing completion. We do not store, share, or use your audio content for any other purpose.`
  },
  {
    title: '4. Service Availability',
    content: `We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Maintenance windows and technical issues may occasionally affect service availability. We reserve the right to temporarily suspend services for maintenance or improvements.`
  },
  {
    title: '5. User Responsibilities',
    content: `You are responsible for ensuring you have the legal right to process any audio files you upload. You must not upload copyrighted material without proper authorization. You agree not to use our services for any illegal or unauthorized purpose.`
  },
  {
    title: '6. Privacy and Data Protection',
    content: `Your privacy is important to us. We collect minimal data necessary to provide our services. Audio files are processed temporarily and deleted immediately after processing. Personal information is protected according to our Privacy Policy.`
  },
  {
    title: '7. Limitation of Liability',
    content: `Odoremover shall not be liable for any damages arising from the use or inability to use our services. This includes but is not limited to data loss, business interruption, or any other commercial damages or losses.`
  },
  {
    title: '8. Service Modifications',
    content: `We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We may also modify these terms of service at any time. Continued use of our services constitutes acceptance of any changes.`
  },
  {
    title: '9. Intellectual Property',
    content: `All content, features, and functionality of our services are owned by Odoremover and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.`
  },
  {
    title: '10. Governing Law',
    content: `These terms are governed by the laws of the jurisdiction in which Odoremover operates. Any disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.`
  }
]

function TermsPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Scale sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              Terms of Service
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Please read these terms carefully before using our audio processing services.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                mt: 2
              }}
            >
              Last updated: January 2025
            </Typography>
          </Box>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            mb: 6
          }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
              Agreement to Terms
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: 1.8,
              mb: 4
            }}>
              These Terms of Service ("Terms") govern your use of Odoremover's audio processing services. 
              By using our services, you agree to these terms in full. If you disagree with any part of these terms, 
              you must not use our services.
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }} />

            {sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ 
                  color: 'white', 
                  fontWeight: 600, 
                  mb: 2 
                }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: 1.8,
                  textAlign: 'justify'
                }}>
                  {section.content}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />

            <Box sx={{ 
              backgroundColor: 'rgba(74, 222, 128, 0.1)', 
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: '12px',
              p: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info sx={{ color: '#4ade80', mr: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                  Contact Information
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <span style={{ color: '#4ade80' }}>legal@odoremover.com</span>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default TermsPage
