import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/NewHomePage'
import ToolsPage from './pages/ToolsPage'
import PrivacyPage from './pages/PrivacyPage'
import HowToUsePage from './pages/HowToUsePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsPage from './pages/TermsPage'
import CookiePage from './pages/CookiePage'
import HelpPage from './pages/HelpPage'
import DocsPage from './pages/DocsPage'
import CommunityPage from './pages/CommunityPage'
import VocalRemoverPage from './pages/VocalRemoverPage'
import PitchTempoPage from './pages/PitchTempoPage'
import FormatConverterPage from './pages/FormatConverterPage'
import AudioEditorPage from './pages/AudioEditorPage'
import NoiseReductionPage from './pages/NoiseReductionPage'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0969da',
      light: '#54aeff',
      dark: '#0550ae',
    },
    secondary: {
      main: '#6f42c1',
      light: '#8a63d2',
      dark: '#5a32a3',
    },
    background: {
      default: '#f7f9fc',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#24292f',
      secondary: '#656d76',
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#238636',
      light: '#2ea043',
      dark: '#1a7f37',
    },
    secondary: {
      main: '#1f6feb',
      light: '#388bfd',
      dark: '#0969da',
    },
    background: {
      default: '#0e1418',
      paper: 'rgba(22, 27, 34, 0.9)',
    },
    text: {
      primary: '#f0f6fc',
      secondary: '#7d8590',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #238636 0%, #1f6feb 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2ea043 0%, #388bfd 100%)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(25px)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
})

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.className = isDarkMode ? 'light' : ''
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ 
        margin: 0, 
        padding: 0,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a1d29 0%, #0f1419 50%, #000 100%)',
        overflowX: 'hidden'
      }}>
        <Router>
          <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiePage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/vocal-remover" element={<VocalRemoverPage />} />
            <Route path="/pitch-tempo" element={<PitchTempoPage />} />
            <Route path="/format-converter" element={<FormatConverterPage />} />
            <Route path="/audio-editor" element={<AudioEditorPage />} />
            <Route path="/noise-reduction" element={<NoiseReductionPage />} />
          </Routes>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App