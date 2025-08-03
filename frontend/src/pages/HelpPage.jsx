
import React, { useState } from 'react'
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment
} from '@mui/material'
import {
  Help,
  Search,
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  ExpandMore,
  QuestionAnswer,
  VideoLibrary,
  Description,
  Support
} from '@mui/icons-material'

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Help,
    color: '#4ade80',
    articles: [
      'How to upload audio files',
      'Supported file formats',
      'Account creation guide',
      'First-time user tutorial'
    ]
  },
  {
    title: 'Vocal Remover',
    icon: VolumeOff,
    color: '#ef4444',
    articles: [
      'How vocal removal works',
      'Best practices for vocal separation',
      'Quality settings explained',
      'Troubleshooting poor results'
    ]
  },
  {
    title: 'Pitch & Tempo',
    icon: Tune,
    color: '#3b82f6',
    articles: [
      'Understanding pitch shifting',
      'Tempo adjustment guide',
      'Maintaining audio quality',
      'Advanced settings'
    ]
  },
  {
    title: 'Format Converter',
    icon: SwapHoriz,
    color: '#8b5cf6',
    articles: [
      'Supported conversion formats',
      'Quality vs file size',
      'Batch conversion guide',
      'Metadata preservation'
    ]
  }
]

const faqData = [
  {
    question: 'What audio formats do you support?',
    answer: 'We support all major audio formats including MP3, WAV, FLAC, AAC, OGG, M4A, and many more. Our system automatically detects the format and processes accordingly.'
  },
  {
    question: 'How long does processing take?',
    answer: 'Processing time depends on the file size and complexity. Most files are processed within 30 seconds to 2 minutes. Larger files may take longer.'
  },
  {
    question: 'Is my audio data secure?',
    answer: 'Yes, absolutely. Your files are processed securely and automatically deleted from our servers immediately after processing. We never store or share your audio content.'
  },
  {
    question: 'Can I process multiple files at once?',
    answer: 'Yes, our batch processing feature allows you to upload and process multiple files simultaneously, saving you time and effort.'
  },
  {
    question: 'What if I\'m not satisfied with the results?',
    answer: 'You can try different quality settings or processing options. If you continue to have issues, please contact our support team for assistance.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a satisfaction guarantee. If you\'re not happy with our service, please contact our support team within 30 days for a full refund.'
  }
]

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(false)

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false)
  }

  const filteredFaq = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Help sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              Help Center
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Find answers to common questions and learn how to make the most of our audio processing tools.
            </Typography>

            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(45, 55, 72, 0.8)',
                  color: 'white',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#4ade80' }
                },
                '& .MuiInputBase-input::placeholder': { 
                  color: 'rgba(255, 255, 255, 0.5)' 
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </motion.div>

        {/* Quick Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Browse by Category
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {helpCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Paper sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 4,
                      textAlign: 'center',
                      height: '280px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(55, 65, 82, 0.9)',
                        border: `1px solid ${category.color}`,
                      }
                    }}>
                      <Icon sx={{ fontSize: 50, color: category.color, mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                        {category.title}
                      </Typography>
                      <Box>
                        {category.articles.map((article, articleIndex) => (
                          <Typography 
                            key={articleIndex}
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.7)', 
                              mb: 1,
                              '&:hover': { color: category.color }
                            }}
                          >
                            • {article}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          <Paper sx={{
            backgroundColor: 'rgba(45, 55, 72, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 4,
            mb: 8
          }}>
            {filteredFaq.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === `panel${index}`}
                onChange={handleFaqChange(`panel${index}`)}
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  borderBottom: index < filteredFaq.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  '&:before': { display: 'none' },
                  '& .MuiAccordionSummary-root': {
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: '#4ade80' }} />}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                  <Typography variant="body1" sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    lineHeight: 1.8 
                  }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Additional Resources
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                height: '200px'
              }}>
                <VideoLibrary sx={{ fontSize: 40, color: '#ef4444', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Video Tutorials
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Step-by-step video guides for all our tools
                </Typography>
                <Button variant="outlined" sx={{ color: '#ef4444', borderColor: '#ef4444' }}>
                  Watch Now
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                height: '200px'
              }}>
                <Description sx={{ fontSize: 40, color: '#3b82f6', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Documentation
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Comprehensive guides and API documentation
                </Typography>
                <Button variant="outlined" sx={{ color: '#3b82f6', borderColor: '#3b82f6' }}>
                  Read Docs
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                height: '200px'
              }}>
                <Support sx={{ fontSize: 40, color: '#10b981', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Live Support
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Chat with our support team in real-time
                </Typography>
                <Button variant="outlined" sx={{ color: '#10b981', borderColor: '#10b981' }}>
                  Start Chat
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper sx={{
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '24px',
            p: 6,
            textAlign: 'center'
          }}>
            <QuestionAnswer sx={{ fontSize: 50, color: '#4ade80', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Still Need Help?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}>
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </Typography>
            <Button 
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#4ade80',
                color: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#22c55e',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              Contact Support
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HelpPage
