import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert
} from '@mui/material'
import {
  ExpandMore,
  Help,
  PlayArrow,
  CloudUpload,
  Download
} from '@mui/icons-material'

const faqs = [
  {
    question: "What audio formats are supported?",
    answer: "We support MP3, WAV, FLAC, M4A, AAC, and OGG formats. Files up to 100MB can be processed."
  },
  {
    question: "How accurate is the vocal removal?",
    answer: "Our AI achieves 99% accuracy in vocal separation using advanced machine learning algorithms trained on millions of audio samples."
  },
  {
    question: "Is my audio data secure?",
    answer: "Yes, all files are encrypted during upload and processing. Original files are automatically deleted within 24 hours."
  },
  {
    question: "Can I use this for commercial purposes?",
    answer: "Yes, you can use our tools for commercial projects. Please review our Terms of Service for detailed usage rights."
  },
  {
    question: "What's the processing time?",
    answer: "Most audio files are processed within 1-3 minutes depending on file size and complexity."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required for basic usage. Simply upload your file and start processing immediately."
  }
]

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our audio processing tools",
    steps: ["Upload your audio file", "Select processing type", "Download results"]
  },
  {
    title: "Advanced Features",
    description: "Discover professional-grade capabilities",
    steps: ["Quality settings", "Batch processing", "Format conversion"]
  },
  {
    title: "Troubleshooting",
    description: "Solutions to common issues",
    steps: ["File format errors", "Processing failures", "Download problems"]
  }
]

function HelpPage() {
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
            Help Center
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Find answers to common questions and learn how to get the most out of our audio processing tools
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Quick Start Guide */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: '20px', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                  Quick Start
                </Typography>
                {guides.map((guide, index) => (
                  <Box key={guide.title} sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                      {guide.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {guide.description}
                    </Typography>
                    <Box component="ol" sx={{ pl: 2 }}>
                      {guide.steps.map((step, stepIndex) => (
                        <Typography key={stepIndex} component="li" variant="body2" sx={{ mb: 0.5 }}>
                          {step}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* FAQs */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              Frequently Asked Questions
            </Typography>
            <Box>
              {faqs.map((faq, index) => (
                <Accordion 
                  key={index}
                  sx={{ 
                    mb: 2, 
                    borderRadius: '12px !important',
                    '&:before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ 
                      borderRadius: '12px',
                      '&.Mui-expanded': { borderRadius: '12px 12px 0 0' }
                    }}
                  >
                    <Typography variant="h6" fontWeight="600">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Contact Support */}
        <Alert 
          severity="info" 
          sx={{ mt: 6, borderRadius: '16px', p: 3 }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Need More Help?
          </Typography>
          <Typography variant="body1">
            Can't find what you're looking for? Contact our support team at support@odoremover.com 
            or visit our Contact page for direct assistance.
          </Typography>
        </Alert>
      </motion.div>
    </Container>
  )
}

export default HelpPage