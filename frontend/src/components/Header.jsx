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

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Vocal Remover', path: '/vocal-remover', icon: VolumeOff },
  { name: 'Pitch & Tempo', path: '/pitch-tempo', icon: Tune },
  { name: 'Format Converter', path: '/format-converter', icon: SwapHoriz },
  { name: 'Audio Editor', path: '/audio-editor', icon: ContentCut },
  { name: 'Noise Reduction', path: '/noise-reduction', icon: MusicNote },
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
      <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(20px)' }}>
        <Toolbar>
          <GraphicEq sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Audio Studio Pro
          </Typography>
          
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

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default Header