import React from 'react'
import { motion } from 'framer-motion'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Divider
} from '@mui/material'

function TermsPage() {
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
            Terms of Service
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated: August 3, 2025
          </Typography>
        </Box>

        <Card sx={{ borderRadius: '20px' }}>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              By accessing and using Odoremover, you accept and agree to be bound by the terms and provision of this agreement.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              2. Use License
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Permission is granted to temporarily download one copy of Odoremover per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 4 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                modify or copy the materials
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                use the materials for any commercial purpose or for any public display
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                attempt to reverse engineer any software contained on the website
              </Typography>
              <Typography component="li" variant="body1">
                remove any copyright or other proprietary notations from the materials
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              3. Disclaimer
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              The materials on Odoremover are provided on an 'as is' basis. Odoremover makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              4. Limitations
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              In no event shall Odoremover or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Odoremover, even if Odoremover or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              5. Accuracy of Materials
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              The materials appearing on Odoremover could include technical, typographical, or photographic errors. Odoremover does not warrant that any of the materials on its website are accurate, complete, or current.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              6. Links
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Odoremover has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Odoremover of the site.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              7. Modifications
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              Odoremover may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              8. Governing Law
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  )
}

export default TermsPage