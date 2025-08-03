import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  DialogTitle
} from '@mui/material'
import { 
  MusicNote, 
  Speed, 
  HighQuality, 
  Security,
  Group,
  TrendingUp,
  EmojiEvents,
  Favorite
} from '@mui/icons-material'

return (
    <Container maxWidth="lg" sx={{ py: 8, minHeight: '100vh' }}>
      <VisuallyHidden.Root>
        <DialogTitle>About AudioStudio Pro - Professional Audio Processing Platform</DialogTitle>
      </VisuallyHidden.Root>