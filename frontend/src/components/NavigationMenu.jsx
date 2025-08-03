import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Box, 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material'
import {
  Home,
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  Psychology,
  Settings,
  Build
} from '@mui/icons-material'

const NavigationMenu = ({ open, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Home', icon: Home, section: 'Main' },
    { path: '/tools', label: 'All Tools', icon: Build, section: 'Main' },
    { path: '/vocal-remover', label: 'Vocal Remover', icon: VolumeOff, section: 'Audio Tools' },
    { path: '/pitch-tempo', label: 'Pitch & Tempo', icon: Tune, section: 'Audio Tools' },
    { path: '/format-converter', label: 'Format Converter', icon: SwapHoriz, section: 'Audio Tools' },
    { path: '/audio-editor', label: 'Audio Editor', icon: ContentCut, section: 'Audio Tools' },
    { path: '/noise-reduction', label: 'Noise Reduction', icon: MusicNote, section: 'Audio Tools' },
    { path: '/how-to-use-vocal-remover', label: 'Vocal Remover Guide', icon: Psychology, section: 'How to Use' },
    { path: '/how-to-use-pitch-tempo', label: 'Pitch & Tempo Guide', icon: Settings, section: 'How to Use' },
    { path: '/how-to-use-format-converter', label: 'Format Converter Guide', icon: SwapHoriz, section: 'How to Use' },
    { path: '/how-to-use-audio-editor', label: 'Audio Editor Guide', icon: ContentCut, section: 'How to Use' },
    { path: '/how-to-use-noise-reduction', label: 'Noise Reduction Guide', icon: MusicNote, section: 'How to Use' }
  ]

  const sections = [...new Set(menuItems.map(item => item.section))]

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          border: 'none'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ 
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          OdoRemover
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Audio Processing Suite
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {sections.map((section) => (
        <Box key={section} sx={{ mb: 2 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              px: 3, 
              pt: 2, 
              pb: 1, 
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em'
            }}
          >
            {section}
          </Typography>
          
          <List sx={{ py: 0 }}>
            {menuItems
              .filter(item => item.section === section)
              .map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <ListItem
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={onClose}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: '8px',
                      mx: 1,
                      mb: 0.5,
                      transition: 'all 0.3s ease',
                      backgroundColor: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                      border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: isActive ? '#8b5cf6' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: 40
                    }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.9rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)'
                        }
                      }}
                    />
                  </ListItem>
                )
              })}
          </List>
        </Box>
      ))}
    </Drawer>
  )
}

export default NavigationMenu