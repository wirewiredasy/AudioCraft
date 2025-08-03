import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  Menu as MenuIcon,
  MusicNote,
  Tune,
  SwapHoriz,
  ContentCut,
  VolumeOff,
  Home,
  DarkMode,
  LightMode,
  GraphicEq
} from '@mui/icons-material'
import MobileMenu from './MobileMenu'

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Voice AI', path: '/voice-ai-landing', icon: GraphicEq },
  { name: 'Studio', path: '/processing-studio', icon: Tune },
  { name: 'AI Features', path: '/ai-features', icon: VolumeOff },
  { name: 'Vocal Remover', path: '/vocal-remover', icon: VolumeOff },
  { name: 'Pitch & Tempo', path: '/pitch-tempo', icon: Tune },
]

function Header({ isDarkMode, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <ListItem
              key={item.name}
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                backgroundColor: location.pathname === item.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                <Icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}
              />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar position="fixed" sx={{ 
        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(59, 130, 246, 0.95)', 
        backdropFilter: 'blur(20px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1201,
        transition: 'all 0.3s ease'
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                O
              </Typography>
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              Odoremover
            </Typography>
          </Box>
          
          <IconButton
            onClick={onToggleTheme}
            color="inherit"
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === item.path ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>


      {/* Mobile Menu - Slide from top */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: mobileOpen ? '100vh' : '0px',
          backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.98)' : 'rgba(248, 250, 252, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 1200,
          overflow: 'hidden',
          transition: 'height 0.3s ease',
          display: { xs: 'block', md: 'none' }
        }}
      >
        <Box sx={{ pt: '64px', p: 3 }}>
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                fullWidth
                startIcon={<Icon />}
                sx={{
                  justifyContent: 'flex-start',
                  py: 2,
                  px: 3,
                  mb: 1,
                  backgroundColor: location.pathname === item.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  }
                }}
              >
                {item.name}
              </Button>
            )
          })}
        </Box>
      </Box>
      
      {/* Add spacing for fixed header */}
      <Box sx={{ height: '64px' }} />
    </>
  )
}

export default Header