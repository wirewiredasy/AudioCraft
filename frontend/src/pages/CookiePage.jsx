
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Cookie, Security, Analytics, Settings } from '@mui/icons-material'

const cookieTypes = [
  {
    type: 'Essential Cookies',
    icon: Security,
    color: '#ef4444',
    description: 'These cookies are necessary for the website to function and cannot be switched off.',
    examples: ['Session management', 'Security tokens', 'Load balancing']
  },
  {
    type: 'Analytics Cookies',
    icon: Analytics,
    color: '#3b82f6',
    description: 'These cookies help us understand how visitors interact with our website.',
    examples: ['Page views', 'User behavior', 'Performance metrics']
  },
  {
    type: 'Functional Cookies',
    icon: Settings,
    color: '#10b981',
    description: 'These cookies enable enhanced functionality and personalization.',
    examples: ['User preferences', 'Language settings', 'Theme choices']
  }
]

const cookieTable = [
  { name: 'session_id', purpose: 'User session management', duration: 'Session', type: 'Essential' },
  { name: 'csrf_token', purpose: 'Security protection', duration: '1 hour', type: 'Essential' },
  { name: 'user_preferences', purpose: 'Store user settings', duration: '1 year', type: 'Functional' },
  { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years', type: 'Analytics' },
  { name: 'theme_mode', purpose: 'Remember theme preference', duration: '1 year', type: 'Functional' }
]

function CookiePage() {
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
            <Cookie sx={{ fontSize: 60, color: '#4ade80', mb: 2 }} />
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 300,
                color: 'white',
                mb: 3
              }}
            >
              Cookie Policy
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
              Learn about how we use cookies to improve your experience on our audio processing platform.
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

        {/* What are Cookies */}
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
            mb: 6
          }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
              What Are Cookies?
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: 1.8,
              mb: 4
            }}>
              Cookies are small text files that are stored on your computer or mobile device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: 1.8
            }}>
              We use cookies responsibly and transparently. This policy explains what cookies we use, why we use them, 
              and how you can control your cookie preferences.
            </Typography>
          </Paper>
        </motion.div>

        {/* Types of Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', mb: 6 }}>
            Types of Cookies We Use
          </Typography>
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon
              return (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Paper sx={{
                      backgroundColor: 'rgba(45, 55, 72, 0.6)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      p: 4,
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Icon sx={{ fontSize: 40, color: cookie.color, mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                        {cookie.type}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 3,
                        flex: 1
                      }}>
                        {cookie.description}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: cookie.color, mb: 1 }}>
                        Examples:
                      </Typography>
                      <List dense>
                        {cookie.examples.map((example, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                              primary={`• ${example}`}
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  fontSize: '0.875rem',
                                  color: 'rgba(255, 255, 255, 0.8)' 
                                } 
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </motion.div>
                </Grid>
              )
            })}
          </Grid>
        </motion.div>

        {/* Cookie Details Table */}
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
            mb: 6
          }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
              Cookie Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 600, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      Cookie Name
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      Purpose
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      Duration
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cookieTable.map((cookie, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        fontFamily: 'monospace'
                      }}>
                        {cookie.name}
                      </TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        {cookie.purpose}
                      </TableCell>
                      <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        {cookie.duration}
                      </TableCell>
                      <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <Box sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: '12px',
                          backgroundColor: cookie.type === 'Essential' ? 'rgba(239, 68, 68, 0.2)' :
                                         cookie.type === 'Analytics' ? 'rgba(59, 130, 246, 0.2)' :
                                         'rgba(16, 185, 129, 0.2)',
                          color: cookie.type === 'Essential' ? '#ef4444' :
                                 cookie.type === 'Analytics' ? '#3b82f6' :
                                 '#10b981',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          display: 'inline-block'
                        }}>
                          {cookie.type}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                height: '100%'
              }}>
                <Settings sx={{ fontSize: 40, color: '#4ade80', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Managing Your Cookies
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: 1.8,
                  mb: 3
                }}>
                  You can control and manage cookies in various ways. Please note that removing or blocking cookies 
                  may impact your user experience and parts of our website may no longer be fully accessible.
                </Typography>
                <List>
                  {[
                    'Browser settings to block or delete cookies',
                    'Third-party tools for cookie management',
                    'Opt-out links for analytics services',
                    'Contact us for specific cookie concerns'
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#4ade80' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            color: 'rgba(255, 255, 255, 0.8)' 
                          } 
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{
                backgroundColor: 'rgba(45, 55, 72, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                height: '100%'
              }}>
                <Security sx={{ fontSize: 40, color: '#3b82f6', mb: 2 }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Your Rights
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  lineHeight: 1.8,
                  mb: 3
                }}>
                  Under data protection laws, you have rights regarding how we use cookies and process your data.
                </Typography>
                <List>
                  {[
                    'Right to withdraw consent at any time',
                    'Right to access your cookie data',
                    'Right to request deletion of data',
                    'Right to object to certain processing'
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Box sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          backgroundColor: '#3b82f6' 
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        sx={{ 
                          '& .MuiListItemText-primary': { 
                            color: 'rgba(255, 255, 255, 0.8)' 
                          } 
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* Contact Section */}
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
            mt: 8,
            textAlign: 'center'
          }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
              Questions About Cookies?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              If you have any questions about our use of cookies or this Cookie Policy, 
              please contact us at{' '}
              <span style={{ color: '#4ade80' }}>privacy@odoremover.com</span>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default CookiePage
