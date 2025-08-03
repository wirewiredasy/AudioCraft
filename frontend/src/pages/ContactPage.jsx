import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
  DialogTitle
} from '@mui/material'

function ContactForm() {
  return (
    <Container maxWidth="lg" sx={{ py: 8, minHeight: '100vh' }}>
      <VisuallyHidden.Root>
        <DialogTitle>Contact AudioStudio Pro - Get in Touch with Our Team</DialogTitle>
      </VisuallyHidden.Root>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="Name" fullWidth required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" type="email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" multiline rows={4} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ContactForm;