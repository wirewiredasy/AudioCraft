import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { 
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material'
import {
  Close,
  Home,
  Build,
  VolumeOff,
  Tune,
  SwapHoriz,
  ContentCut,
  MusicNote,
  Help,
  Security
} from '@mui/icons-material'

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'All Tools', path: '/tools', icon: Build },
  { name: 'Vocal Remover', path: '/vocal-remover', icon: VolumeOff },
  { name: 'Pitch & Tempo', path: '/pitch-tempo', icon: Tune },
  { name: 'Format Converter', path: '/format-converter', icon: SwapHoriz },
  { name: 'Audio Editor', path: '/audio-editor', icon: ContentCut },
  { name: 'Noise Reduction', path: '/noise-reduction', icon: MusicNote },
]

const infoPages = [
  { name: 'How to Use', path: '/how-to-use', icon: Help },
  { name: 'Privacy Policy', path: '/privacy', icon: Security },
]

function MobileMenu({ open, onClose }) {
  const location = useLocation()

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" />
        <Dialog.Content 
          className="fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-2xl transition-all duration-300 ease-out"
          style={{
            background: 'linear-gradient(180deg, rgba(26, 29, 41, 0.98) 0%, rgba(15, 20, 25, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottomLeftRadius: '24px',
            borderBottomRightRadius: '24px',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 3,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #1f6feb 0%, #238636 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2
              }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                  O
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Odoremover
              </Typography>
            </Box>
            
            <Dialog.Close asChild>
              <IconButton sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Dialog.Close>
          </Box>

          {/* Navigation */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              px: 2, 
              py: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem'
            }}>
              Audio Tools
            </Typography>
            
            <List sx={{ py: 0 }}>
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <ListItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    onClick={onClose}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      mx: 1,
                      mb: 0.5,
                      backgroundColor: isActive ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: '40px'
                    }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      sx={{ 
                        color: isActive ? '#4ade80' : 'white',
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? 600 : 400
                        }
                      }}
                    />
                  </ListItem>
                )
              })}
            </List>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

            <Typography variant="subtitle2" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              px: 2, 
              py: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem'
            }}>
              Information
            </Typography>

            <List sx={{ py: 0 }}>
              {infoPages.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <ListItem
                    key={item.name}
                    component={Link}
                    to={item.path}
                    onClick={onClose}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      mx: 1,
                      mb: 0.5,
                      backgroundColor: isActive ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.7)',
                      minWidth: '40px'
                    }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      sx={{ 
                        color: isActive ? '#4ade80' : 'white',
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? 600 : 400
                        }
                      }}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Box>

          {/* Footer */}
          <Box sx={{ 
            p: 3, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              © 2025 Odoremover. Professional audio tools.
            </Typography>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MobileMenu