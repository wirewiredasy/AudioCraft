
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material'
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Support,
  Business,
  QuestionAnswer,
  BugReport,
  Lightbulb
} from '@mui/icons-material'

const contactMethods = [
  {
    icon: Email,
    title: 'Email Support',
    description: 'Get help with technical issues and questions',
    contact: 'support@odoremover.com',
    color: '#4ade80'
  },
  {
    icon: Business,
    title: 'Business Inquiries',
    description: 'Partnership and business opportunities',
    contact: 'business@odoremover.com',
    color: '#3b82f6'
  },
  {
    icon: Support,
    title: '24/7 Support',
    description: 'Round-the-clock technical assistance',
    contact: 'Available via chat and email',
    color: '#8b5cf6'
  }
]

const inquiryTypes = [
  'Technical Support',
  'Bug Report',
  'Feature Request',
  'Business Inquiry',
  'Partnership',
  'Media & Press',
  'Other'
]

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
    setFormData({ name: '', email: '', inquiryType: '', message: '' })
  }

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

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
              Get in Touch
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
              Have questions, feedback, or need support? We're here to help you make the most of our audio processing tools.
            </Typography>
          </Box>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Grid item xs={12} md={4} key={index}>
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
                      height: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Icon sx={{ fontSize: 50, color: method.color, mb: 2, mx: 'auto' }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                        {method.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                        {method.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: method.color, fontWeight: 600 }}>
                        {method.contact}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                p: 6
              }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 4 }}>
                  Send us a Message
                </Typography>
                
                {showSuccess && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#4ade80' }
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#4ade80' }
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Inquiry Type
                        </InputLabel>
                        <Select
                          value={formData.inquiryType}
                          onChange={handleChange('inquiryType')}
                          required
                          sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': { 
                              borderColor: 'rgba(255, 255, 255, 0.3)' 
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': { 
                              borderColor: 'rgba(255, 255, 255, 0.5)' 
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                              borderColor: '#4ade80' 
                            }
                          }}
                        >
                          {inquiryTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange('message')}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#4ade80' }
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{
                          backgroundColor: '#4ade80',
                          color: 'white',
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: '#22c55e',
                            transform: 'translateY(-1px)',
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            {/* FAQ Section */}
            <Grid item xs={12} lg={4}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                mb: 4
              }}>
                <QuestionAnswer sx={{ fontSize: 40, color: '#4ade80', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Quick Help
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Check our FAQ section for instant answers to common questions about our audio processing tools.
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    color: '#4ade80', 
                    borderColor: '#4ade80',
                    '&:hover': { backgroundColor: 'rgba(74, 222, 128, 0.1)' }
                  }}
                >
                  View FAQ
                </Button>
              </Paper>

              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4
              }}>
                <BugReport sx={{ fontSize: 40, color: '#ef4444', mb: 2 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                  Report a Bug
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                  Found an issue? Let us know and we'll fix it quickly. Your feedback helps us improve.
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    color: '#ef4444', 
                    borderColor: '#ef4444',
                    '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
                  }}
                >
                  Report Bug
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* Office Info */}
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
            mt: 8,
            textAlign: 'center'
          }}>
            <LocationOn sx={{ fontSize: 50, color: '#4ade80', mb: 2 }} />
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Visit Our Office
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
              123 Audio Tech Street, Suite 456
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
              San Francisco, CA 94105
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Monday - Friday: 9:00 AM - 6:00 PM PST
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default ContactPage
