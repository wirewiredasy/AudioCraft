import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

const cookieTypes = [
  {
    name: 'Essential Cookies',
    purpose: 'Required for basic website functionality',
    duration: 'Session',
    examples: 'Authentication, security, user preferences'
  },
  {
    name: 'Analytics Cookies',
    purpose: 'Help us understand how visitors use our website',
    duration: '2 years',
    examples: 'Google Analytics, page views, user behavior'
  },
  {
    name: 'Performance Cookies',
    purpose: 'Improve website performance and user experience',
    duration: '1 year',
    examples: 'Loading times, error tracking, optimization'
  },
  {
    name: 'Marketing Cookies',
    purpose: 'Show relevant advertisements and track campaigns',
    duration: '30 days',
    examples: 'Ad targeting, conversion tracking, retargeting'
  }
]

function CookiesPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
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
            Cookie Policy
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated: August 3, 2025
          </Typography>
        </Box>

        <Card sx={{ borderRadius: '20px' }}>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              What Are Cookies?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide information to the site owners.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              How We Use Cookies
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              We use cookies to enhance your browsing experience, analyze site traffic, personalize content, 
              and provide social media features. We also share information about your use of our site with 
              analytics and advertising partners.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Types of Cookies We Use
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell><strong>Cookie Type</strong></TableCell>
                    <TableCell><strong>Purpose</strong></TableCell>
                    <TableCell><strong>Duration</strong></TableCell>
                    <TableCell><strong>Examples</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cookieTypes.map((cookie, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="600">
                          {cookie.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {cookie.purpose}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {cookie.duration}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {cookie.examples}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Managing Your Cookie Preferences
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              You can control and manage cookies in several ways:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                <strong>Cookie Banner:</strong> Use our cookie consent banner to choose which types of cookies to accept
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                <strong>Opt-out Tools:</strong> Use industry opt-out tools for advertising cookies
              </Typography>
              <Typography component="li" variant="body1">
                <strong>Privacy Settings:</strong> Adjust your privacy settings in your browser or device
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Third-Party Cookies
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Some cookies on our site are set by third-party services. We use Google Analytics to analyze website traffic, 
              social media plugins for sharing content, and advertising services to show relevant ads. 
              These third parties may use cookies to collect information about your online activities.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Changes to This Policy
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              We may update this cookie policy from time to time to reflect changes in our practices or for legal reasons. 
              We will notify you of any significant changes by posting the updated policy on this page.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              If you have any questions about our use of cookies, please contact us at privacy@odoremover.com 
              or through our contact page. We're here to help you understand and manage your privacy preferences.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  )
}

export default CookiesPage