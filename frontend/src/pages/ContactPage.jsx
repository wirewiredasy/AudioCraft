import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Alert
} from '@mui/material'
import {
  Email,
  Phone,
  LocationOn,
  Send,
  GitHub,
  Twitter,
  LinkedIn
} from '@mui/icons-material'

const contactInfo = [
  {
    title: 'Email Us',
    description: 'Send us an email and we\'ll get back to you within 24 hours',
    icon: Email,
    value: 'support@odoremover.com',
    color: '#3b82f6'
  },
  {
    title: 'Call Us',
    description: 'Speak with our support team during business hours',
    icon: Phone,
    value: '+1 (555) 123-4567',
    color: '#10b981'
  },
  {
    title: 'Visit Us',
    description: 'Come visit our office headquarters',
    icon: LocationOn,
    value: '123 Tech Street, San Francisco, CA 94105',
    color: '#f59e0b'
  }
]

const socialLinks = [
  { name: 'GitHub', icon: GitHub, url: 'https://github.com/odoremover', color: '#333' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/odoremover', color: '#1da1f2' },
  { name: 'LinkedIn', icon: LinkedIn, url: 'https://linkedin.com/company/odoremover', color: '#0077b5' }
]

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setShowSuccess(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
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
            Get in Touch
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Have questions about our audio processing tools? Need technical support? 
            We're here to help and would love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: '20px' }}>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                  Send us a Message
                </Typography>
                
                {showSuccess && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 4, borderRadius: '12px' }}
                  >
                    Thank you for your message! We'll get back to you within 24 hours.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        sx={{ 
                          '& .MuiOutlinedInput-root': { borderRadius: '12px' }
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          fontSize: '1rem'
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'grid', gap: 3, mb: 4 }}>
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 8px 25px ${info.color}30`,
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Avatar
                            sx={{
                              backgroundColor: info.color,
                              width: 48,
                              height: 48
                            }}
                          >
                            <Icon sx={{ fontSize: 24 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                              {info.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {info.description}
                            </Typography>
                            <Typography variant="body2" fontWeight="600" color="primary.main">
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </Box>

            {/* Social Links */}
            <Card sx={{ borderRadius: '16px' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Button
                        key={social.name}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          minWidth: 48,
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          backgroundColor: `${social.color}10`,
                          color: social.color,
                          '&:hover': {
                            backgroundColor: social.color,
                            color: 'white',
                          }
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }} />
                      </Button>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  )
}

export default ContactPage