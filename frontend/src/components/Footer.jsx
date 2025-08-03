import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  Grid, 
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { 
  VolumeOff, 
  Tune, 
  SwapHoriz, 
  ContentCut, 
  MusicNote,
  ExpandMore,
  Build,
  GitHub,
  Twitter,
  Email
} from '@mui/icons-material'

const audioTools = [
  { name: 'Vocal Remover', path: '/vocal-remover', icon: VolumeOff, description: 'AI-powered vocal separation' },
  { name: 'Pitch & Tempo', path: '/pitch-tempo', icon: Tune, description: 'Professional audio adjustment' },
  { name: 'Format Converter', path: '/format-converter', icon: SwapHoriz, description: 'Universal audio conversion' },
  { name: 'Audio Editor', path: '/audio-editor', icon: ContentCut, description: 'Cut and join audio files' },
  { name: 'Noise Reduction', path: '/noise-reduction', icon: MusicNote, description: 'Crystal clear audio enhancement' },
]

const footerLinks = {
  Company: [
    { name: 'About', path: '/about' },
    { name: 'How to Use', path: '/how-to-use' },
    { name: 'Contact', path: '/contact' }
  ],
  Legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' }
  ],
  Support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Community', path: '/community' }
  ]
}

function Footer() {
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, rgba(15, 20, 25, 0.95) 0%, rgba(0, 0, 0, 1) 100%)',
      pt: 6,
      pb: 4,
      mt: 8,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #1f6feb 0%, #238636 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 2
              }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  O
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                Odoremover
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, lineHeight: 1.6 }}>
              Professional audio processing tools powered by cutting-edge AI. Remove vocals, adjust pitch, convert formats, and enhance your audio with ease.
            </Typography>

            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4ade80' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4ade80' } }}>
                <GitHub />
              </IconButton>
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: '#4ade80' } }}>
                <Email />
              </IconButton>
            </Box>
          </Grid>

          {/* Tools Dropdown Section */}
          <Grid item xs={12} sm={6} md={2}>
            <DropdownMenu.Root open={toolsMenuOpen} onOpenChange={setToolsMenuOpen}>
              <DropdownMenu.Trigger asChild>
                <Button
                  variant="text"
                  endIcon={<ExpandMore sx={{ 
                    transform: toolsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} />}
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    p: 0,
                    justifyContent: 'flex-start',
                    '&:hover': { backgroundColor: 'transparent', color: '#4ade80' }
                  }}
                >
                  <Build sx={{ mr: 1 }} />
                  Tools
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={5}
                  align="start"
                  style={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                    padding: '8px',
                    minWidth: '240px',
                    zIndex: 9999,
                    maxHeight: '400px',
                    overflow: 'auto'
                  }}
                >
                  <VisuallyHidden.Root>
                    <DropdownMenu.Label>Audio Processing Tools</DropdownMenu.Label>
                  </VisuallyHidden.Root>
                  
                  {audioTools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <DropdownMenu.Item key={tool.name} asChild>
                        <Link
                          to={tool.path}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          onClick={() => setToolsMenuOpen(false)}
                        >
                          <Icon style={{ marginRight: '8px', color: '#4ade80', fontSize: '18px' }} />
                          <div>
                            <div style={{ fontWeight: 500 }}>{tool.name}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                              {tool.description}
                            </div>
                          </div>
                        </Link>
                      </DropdownMenu.Item>
                    )
                  })}
                  
                  <DropdownMenu.Separator style={{ height: '1px', backgroundColor: '#374151', margin: '8px 0' }} />
                  
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/tools"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        color: '#4ade80',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      onClick={() => setToolsMenuOpen(false)}
                    >
                      <Build style={{ marginRight: '8px', fontSize: '18px' }} />
                      <span>View All Tools</span>
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </Grid>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={12} sm={6} md={2} key={category}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                {category}
              </Typography>
              {links.map((link) => (
                <Typography
                  key={link.name}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: '#4ade80',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

        {/* Bottom Footer */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2025 Odoremover. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)', 
                cursor: 'pointer',
                '&:hover': { color: 'white' }
              }}
            >
              Status
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)', 
                cursor: 'pointer',
                '&:hover': { color: 'white' }
              }}
            >
              API
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer