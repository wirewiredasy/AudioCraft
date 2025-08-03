  
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Grid, 
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Button
} from '@mui/material'
import {
  Description,
  Code,
  Api,
  Integration,
  Security,
  Speed,
  CloudUpload,
  Download,
  Settings,
  PlayArrow,
  CheckCircle
} from '@mui/icons-material'

const sidebarItems = [
  { title: 'Getting Started', icon: PlayArrow, id: 'getting-started' },
  { title: 'API Reference', icon: Api, id: 'api-reference' },
  { title: 'Authentication', icon: Security, id: 'authentication' },
  { title: 'File Upload', icon: CloudUpload, id: 'file-upload' },
  { title: 'Processing', icon: Settings, id: 'processing' },
  { title: 'Download Results', icon: Download, id: 'download' },
  { title: 'Error Handling', icon: Code, id: 'error-handling' },
  { title: 'Rate Limits', icon: Speed, id: 'rate-limits' }
]

const codeExamples = {
  javascript: `// JavaScript example
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('operation', 'vocal_removal');

fetch('/api/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key'
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));`,

  python: `# Python example
import requests

url = "https://api.odoremover.com/process"
headers = {"Authorization": "Bearer your-api-key"}
files = {"audio": open("song.mp3", "rb")}
data = {"operation": "vocal_removal"}

response = requests.post(url, headers=headers, files=files, data=data)
result = response.json()`,

  curl: `# cURL example
curl -X POST "https://api.odoremover.com/process" \\
  -H "Authorization: Bearer your-api-key" \\
  -F "audio=@song.mp3" \\
  -F "operation=vocal_removal"`
}

function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
      pt: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Description sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              API Documentation
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
              Complete guide to integrating our audio processing APIs into your applications.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              p: 2,
              position: 'sticky',
              top: 24
            }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2, px: 2 }}>
                Navigation
              </Typography>
              <List>
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton
                        selected={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                        sx={{
                          borderRadius: '8px',
                          mb: 0.5,
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(74, 222, 128, 0.2)',
                            color: '#4ade80',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Icon sx={{ color: activeSection === item.id ? '#4ade80' : 'rgba(255, 255, 255, 0.7)' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.title}
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              color: activeSection === item.id ? '#4ade80' : 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.9rem'
                            } 
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              p: 6
            }}>
              {/* Getting Started Section */}
              {activeSection === 'getting-started' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
                    Getting Started
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, lineHeight: 1.8 }}>
                    Welcome to the Odoremover API! Our RESTful API allows you to integrate powerful audio processing 
                    capabilities directly into your applications. This guide will help you get started quickly.
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: '#4ade80', mb: 2 }}>
                      Base URL
                    </Typography>
                    <Paper sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                      p: 2, 
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <Typography variant="body2" sx={{ color: 'white', fontFamily: 'monospace' }}>
                        https://api.odoremover.com/v1
                      </Typography>
                    </Paper>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: '#4ade80', mb: 2 }}>
                      Available Services
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { name: 'Vocal Removal', endpoint: '/vocal-removal' },
                        { name: 'Pitch & Tempo', endpoint: '/pitch-tempo' },
                        { name: 'Format Conversion', endpoint: '/convert' },
                        { name: 'Audio Editing', endpoint: '/edit' },
                        { name: 'Noise Reduction', endpoint: '/denoise' }
                      ].map((service, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Chip 
                            label={`${service.name} - ${service.endpoint}`}
                            sx={{ 
                              backgroundColor: 'rgba(74, 222, 128, 0.2)',
                              color: '#4ade80',
                              width: '100%',
                              justifyContent: 'flex-start'
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              )}

              {/* API Reference Section */}
              {activeSection === 'api-reference' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
                    API Reference
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: '#4ade80', mb: 2 }}>
                      Process Audio File
                    </Typography>
                    <Paper sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                      p: 3, 
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      mb: 3
                    }}>
                      <Typography variant="body2" sx={{ color: '#ef4444', fontFamily: 'monospace', mb: 1 }}>
                        POST /api/process
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Process an audio file with the specified operation
                      </Typography>
                    </Paper>

                    <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                      Parameters
                    </Typography>
                    <List>
                      {[
                        { name: 'audio', type: 'file', description: 'Audio file to process (required)' },
                        { name: 'operation', type: 'string', description: 'Processing operation (vocal_removal, pitch_tempo, etc.)' },
                        { name: 'quality', type: 'string', description: 'Output quality (low, medium, high)' },
                        { name: 'format', type: 'string', description: 'Output format (mp3, wav, flac)' }
                      ].map((param, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: '#4ade80', fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#4ade80', fontFamily: 'monospace' }}>
                                  {param.name}
                                </Typography>
                                <Chip 
                                  label={param.type} 
                                  size="small" 
                                  sx={{ 
                                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                    color: '#3b82f6',
                                    fontSize: '0.7rem'
                                  }} 
                                />
                              </Box>
                            }
                            secondary={param.description}
                            sx={{
                              '& .MuiListItemText-secondary': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.875rem'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Code Examples */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ color: '#4ade80', mb: 2 }}>
                      Code Examples
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {Object.keys(codeExamples).map((lang) => (
                        <Button
                          key={lang}
                          variant={selectedLanguage === lang ? 'contained' : 'outlined'}
                          size="small"
                          onClick={() => setSelectedLanguage(lang)}
                          sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: selectedLanguage === lang ? '#4ade80' : 'transparent',
                            color: selectedLanguage === lang ? 'white' : '#4ade80',
                            borderColor: '#4ade80',
                            '&:hover': {
                              backgroundColor: selectedLanguage === lang ? '#22c55e' : 'rgba(74, 222, 128, 0.1)'
                            }
                          }}
                        >
                          {lang}
                        </Button>
                      ))}
                    </Box>
                    <Paper sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                      p: 3, 
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'auto'
                    }}>
                      <pre style={{ 
                        color: 'white', 
                        fontFamily: 'monospace', 
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                      }}>
                        {codeExamples[selectedLanguage]}
                      </pre>
                    </Paper>
                  </Box>
                </motion.div>
              )}

              {/* Other sections would follow similar pattern */}
              {activeSection === 'authentication' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
                    Authentication
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, lineHeight: 1.8 }}>
                    Our API uses Bearer token authentication. Include your API key in the Authorization header 
                    of all requests.
                  </Typography>
                  
                  <Paper sx={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    p: 3,
                    mb: 3
                  }}>
                    <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 600, mb: 1 }}>
                      Important:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Keep your API key secure and never expose it in client-side code.
                    </Typography>
                  </Paper>
                </motion.div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default DocsPage
